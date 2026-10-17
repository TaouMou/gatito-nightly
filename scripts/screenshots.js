// Takes a preview screenshot of every Feles theme and saves it to images/preview-<theme>.png.
// It launches VS Code in a throwaway profile with the themes installed, opens a small git workspace
// built from sample.ts (modified and untracked files, an error, a selection, terminal output),
// then switches between the themes and captures the window each time, so every image has the same layout.
//
// VS Code stable is downloaded to .vscode-test/ on the first run. Set VSCODE_EXECUTABLE to use another build.
// The editor uses JetBrainsMonoNL Nerd Font Propo when it's installed, and Consolas otherwise.
//
// Usage: node scripts/screenshots.js [filter...] [--scale=2] [--keep-open]
//   filter: only themes whose label contains every given word, e.g. "siamese" or "light"
//   --scale: multiplies the image size, which is 1920×1200 by default

const fs = require("fs");
const os = require("os");
const path = require("path");
const { execFileSync } = require("child_process");
const { _electron: electron } = require("playwright-core");
const { downloadAndUnzipVSCode } = require("@vscode/test-electron");

const root = path.join(__dirname, "..");
const imagesDir = path.join(root, "images");
const pkg = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));

// Layout size in CSS pixels. The images are zoom * scale times larger: 1920×1200 by default.
const width = 1600;
const height = 1000;
// Window zoom level 1, the size the themes are made at
const zoom = 1.2;
// Height of the terminal panel, in CSS pixels
const panelHeight = 200;
// The first line of the workspace's cat.ts in view: the editor shows the greet method, under the class in the sticky scroll
const topLine = 45;

const args = process.argv.slice(2);
const scale = Number((args.find((a) => a.startsWith("--scale=")) || "--scale=1").split("=")[1]);
const keepOpen = args.includes("--keep-open");
const filters = args.filter((a) => !a.startsWith("--")).map((a) => a.toLowerCase());

const themes = pkg.contributes.themes
	.filter((t) => filters.every((f) => t.label.toLowerCase().includes(f)))
	.map((t) => ({
		label: t.label,
		// workbench.colorTheme takes the id when there is one, which the older themes keep for existing users
		setting: t.id || t.label,
		// The workbench gets a class built from the theme path, e.g. "...-themes-feles-siamese-dark-color-theme-json"
		cssClass: t.path.replace(/^\.\//, "").replace(/[^a-z0-9]/gi, "-").toLowerCase(),
		file: `preview-${t.label.replace(/^Feles /, "").toLowerCase().replace(/ /g, "-")}.png`
	}));

if (!themes.length) {
	console.error(`No theme matches "${filters.join(" ")}".`);
	process.exit(1);
}

function write(file, content) {
	fs.mkdirSync(path.dirname(file), { recursive: true });
	fs.writeFileSync(file, typeof content === "string" ? content : JSON.stringify(content, null, "\t"));
}

// Installs the themes as a regular extension, so the title bar doesn't say "Extension Development Host".
function installExtension(extensionsDir) {
	const folder = `${pkg.publisher}.${pkg.name}-${pkg.version}`.toLowerCase();
	const location = path.join(extensionsDir, folder);
	fs.cpSync(path.join(root, "package.json"), path.join(location, "package.json"));
	fs.cpSync(path.join(root, "themes"), path.join(location, "themes"), { recursive: true });

	const uriPath = location.replace(/\\/g, "/").replace(/^([a-z]):/i, (m, drive) => `/${drive.toLowerCase()}:`);
	write(path.join(extensionsDir, "extensions.json"), [{
		identifier: { id: `${pkg.publisher}.${pkg.name}`.toLowerCase() },
		version: pkg.version,
		location: { $mid: 1, path: uriPath, scheme: "file" },
		relativeLocation: folder,
		metadata: { installedTimestamp: Date.now(), source: "vsix" }
	}]);
}

function settings(theme) {
	return {
		"workbench.colorTheme": theme,
		"workbench.startupEditor": "none",
		"workbench.tips.enabled": false,
		"workbench.enableExperiments": false,
		"workbench.secondarySideBar.defaultVisibility": "hidden",
		"chat.disableAIFeatures": true,
		"chat.commandCenter.enabled": false,
		"window.restoreWindows": "none",
		// The look the themes are made with
		// Zoom level 1 comes from the pixel ratio instead (see zoom), which renders the same
		"window.zoomLevel": 0,
		"editor.fontFamily": "'JetBrainsMonoNL Nerd Font Propo', Consolas, 'Courier New', monospace",
		"editor.fontSize": 14,
		"editor.lineHeight": 2.5,
		"editor.fontLigatures": true,
		"workbench.tree.indent": 20,
		"editor.cursorBlinking": "solid",
		"telemetry.telemetryLevel": "off",
		"update.mode": "none",
		"extensions.autoCheckUpdates": false,
		"extensions.ignoreRecommendations": true,
		"security.workspace.trust.enabled": false,
		"git.openRepositoryInParentFolders": "never",
		"git.blame.statusBarItem.enabled": false,
		"typescript.disableAutomaticTypeAcquisition": true,
		"terminal.integrated.gpuAcceleration": "off",
		// A bare prompt, so the terminal doesn't show the temp path
		"terminal.integrated.profiles.windows": { Feles: { path: "cmd.exe", args: ["/d", "/k", "prompt $G$S"] } },
		"terminal.integrated.defaultProfile.windows": "Feles",
		"terminal.integrated.profiles.linux": { Feles: { path: "bash", args: ["--norc", "--noprofile"] } },
		"terminal.integrated.defaultProfile.linux": "Feles",
		"terminal.integrated.profiles.osx": { Feles: { path: "bash", args: ["--norc", "--noprofile"] } },
		"terminal.integrated.defaultProfile.osx": "Feles",
		"terminal.integrated.env.linux": { PS1: "> " },
		"terminal.integrated.env.osx": { PS1: "> " }
	};
}

// A small repository with a committed file that is then modified, an untracked file and an ignored folder,
// so the explorer, the gutter and the terminal all show git colors.
function createWorkspace(dir) {
	// The sample's notes on what to check become plain comments
	const comments = {
		"// Line comment: Blue theme should now be readable (#7a87a1)": "// Feles: one cat, four coats",
		"// Long method body: scroll inside it to test sticky scroll": "// Says hello, unless it's nap time",
		"// Nested brackets: bracket colorization should cycle through 6 colors": "// Very serious nap math",
		"// Default-library members → semantic `variable.defaultLibrary`": "// Count the treats before sharing them"
	};
	if (!fs.existsSync(path.join(root, "sample.ts"))) {
		throw new Error("sample.ts is missing. The screenshots are built from it.");
	}
	const sample = fs.readFileSync(path.join(root, "sample.ts"), "utf8").split(/\r?\n/)
		.map((line) => line.replace(/\/\/ .*/, (comment) => comments[comment] || comment));

	write(path.join(dir, "src", "cat.ts"), sample.join("\n"));
	write(path.join(dir, "src", "fs.d.ts"), 'declare module "fs" {\n\texport function readFileSync(path: string): string;\n\texport interface Stats {}\n}\n');
	write(path.join(dir, "tsconfig.json"), {
		compilerOptions: { target: "ES2022", lib: ["ES2022", "DOM"], strict: true, experimentalDecorators: true, noEmit: true },
		include: ["src"]
	});
	write(path.join(dir, "package.json"), { name: "cat-cafe", version: "1.0.0", private: true });
	write(path.join(dir, "README.md"), "# Cat Café\n\nA place for naps.\n");
	write(path.join(dir, ".gitignore"), "dist/\n");
	write(path.join(dir, "dist", "cat.js"), "");

	const git = (...a) => execFileSync("git", ["-c", "user.name=Feles", "-c", "user.email=feles@example.com", ...a], { cwd: dir, stdio: "ignore" });
	git("init", "-b", "main");
	git("add", ".");
	git("commit", "-m", "Open the café");
	write(path.join(dir, "src", "fs.d.ts"), fs.readFileSync(path.join(dir, "src", "fs.d.ts"), "utf8") + "\n");
	git("add", ".");
	git("commit", "-m", "Tidy up the fs types");

	// An added line, and a changed line that doesn't compile
	sample.splice(57, 0, '    const yawn = "mrrp";');
	const changed = sample.findIndex((line) => line.includes("Date.now()"));
	sample[changed] = sample[changed].replace("Date.now()", "Date.nap()");
	write(path.join(dir, "src", "cat.ts"), sample.join("\n"));
	write(path.join(dir, "src", "naps.ts"), "export const napLength = 20;\n");
}

async function waitForTheme(page, theme) {
	await page.waitForFunction(
		(cls) => document.querySelector(".monaco-workbench")?.className.toLowerCase().includes(cls),
		theme.cssClass,
		{ timeout: 15000 }
	).catch(() => {
		throw new Error(`${theme.label} was not applied. Is it listed in package.json and installed correctly?`);
	});
	// Let the editor, the terminal and the semantic tokens repaint
	await page.waitForTimeout(1500);
}

async function runCommand(page, label) {
	await page.keyboard.press("F1");
	await page.locator(".quick-input-widget input").waitFor();
	await page.keyboard.type(label);
	await page.waitForTimeout(500);
	await page.keyboard.press("Enter");
	await page.waitForTimeout(300);
}

async function main() {
	const executablePath = process.env.VSCODE_EXECUTABLE
		|| await downloadAndUnzipVSCode({ version: "stable", cachePath: path.join(root, ".vscode-test") });

	const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "feles-shots-"));
	const userDataDir = path.join(tmp, "user-data");
	const extensionsDir = path.join(tmp, "extensions");
	const workspace = path.join(tmp, "cat-cafe");
	const settingsFile = path.join(userDataDir, "User", "settings.json");

	installExtension(extensionsDir);
	createWorkspace(workspace);
	write(settingsFile, settings(themes[0].setting));

	// Variables from a parent VS Code or Electron app would make the new window attach to it
	const env = { ...process.env };
	for (const key of Object.keys(env)) {
		if (key.startsWith("VSCODE_") || key.startsWith("ELECTRON_")) delete env[key];
	}

	const app = await electron.launch({
		executablePath,
		env,
		args: [
			workspace,
			path.join(workspace, "src", "cat.ts"),
			`--user-data-dir=${userDataDir}`,
			`--extensions-dir=${extensionsDir}`,
			"--new-window",
			"--skip-welcome",
			"--skip-release-notes",
			"--disable-workspace-trust",
			"--disable-telemetry"
		]
	});

	const page = await app.firstWindow();
	try {
		// An emulated viewport rather than a window size, which the OS would cap at the screen size
		const cdp = await page.context().newCDPSession(page);
		await cdp.send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: zoom * scale, mobile: false });

		await page.locator(".monaco-workbench").waitFor();
		await waitForTheme(page, themes[0]);
		await page.locator(".monaco-editor .view-lines").first().waitFor();

		// Colored terminal output
		await page.keyboard.press("Control+Backquote");
		await page.locator(".terminal-wrapper .xterm").first().waitFor();
		await page.waitForTimeout(1500);
		const windows = process.platform === "win32";
		await page.keyboard.type([
			windows ? "cls" : "clear",
			"git -c color.ui=always status --short",
			"git -c color.ui=always log --oneline --graph --decorate"
		].join(windows ? " & " : "; "));
		await page.keyboard.press("Enter");

		// Shrink the panel by dragging its top edge, to leave more room for the code
		const panel = await page.locator(".part.panel").boundingBox();
		const sashes = await Promise.all((await page.locator(".monaco-sash.horizontal").all()).map((s) => s.boundingBox()));
		const sash = sashes.filter(Boolean).sort((a, b) => Math.abs(a.y - panel.y) - Math.abs(b.y - panel.y))[0];
		const x = panel.x + panel.width / 2;
		await page.mouse.move(x, sash.y + sash.height / 2);
		await page.mouse.down();
		await page.mouse.move(x, panel.y + panel.height - panelHeight, { steps: 10 });
		await page.mouse.up();

		// Wait for the TypeScript server, so the error and the semantic colors show
		await page.waitForFunction(() => /[1-9]/.test(document.getElementById("status.problems")?.textContent || ""), null, { timeout: 60000 })
			.catch(() => console.warn("No error showed up, the TypeScript server may not have started."));

		await runCommand(page, "Notifications: Clear All Notifications");

		// Scroll from the top by whole lines, so no line is half hidden under the sticky scroll,
		// then select "message" (Go to Line would center it between two lines)
		await page.keyboard.press("Control+1");
		await page.keyboard.press("Control+Home");
		for (let i = 1; i < topLine; i++) await page.keyboard.press("Control+ArrowDown");
		await page.locator(".view-line", { hasText: "const message = loud" })
			.locator("span", { hasText: /^\s*message\s*$/ }).last().dblclick();
		// Away from the editor, so no hover shows
		await page.mouse.move(width / 2, height - panelHeight / 2);
		await page.waitForTimeout(2000);

		for (const [i, theme] of themes.entries()) {
			if (i > 0) {
				write(settingsFile, settings(theme.setting));
				await waitForTheme(page, theme);
			}
			const file = path.join(imagesDir, theme.file);
			// Rendered anew at the emulated size, rather than read from the window's smaller surface
			const { data } = await cdp.send("Page.captureScreenshot", {
				format: "png",
				captureBeyondViewport: true,
				clip: { x: 0, y: 0, width, height, scale: 1 }
			});
			fs.writeFileSync(file, Buffer.from(data, "base64"));
			console.log(`${theme.label} → images/${theme.file}`);
		}

		if (keepOpen) {
			console.log("Close the VS Code window to finish.");
			await new Promise((resolve) => app.on("close", resolve));
		}
	} catch (err) {
		const file = path.join(os.tmpdir(), "feles-screenshots-error.png");
		await page.screenshot({ path: file }).then(() => console.error(`The window at the time of the error: ${file}`), () => {});
		throw err;
	} finally {
		await app.close().catch(() => {});
		fs.rmSync(tmp, { recursive: true, force: true, maxRetries: 5, retryDelay: 500 });
	}
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
