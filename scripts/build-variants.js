// Generates the Siamese, Marmalade, Lilac, Chartreux and Tuxedo themes from Russian Blue (dark and light).
// The UI is the same as Russian Blue's, with the teal accent swapped for another one.
// The code colors come from an established scheme that matches each accent:
// - Siamese: JetBrains Islands Dark and IntelliJ Light, from the scheme files in JetBrains/intellij-community
//   (platform/platform-resources/src/themes and python/pluginResources/colorSchemes).
// - Marmalade: Ayu Dark and Ayu Light, from ayu-theme/vscode-ayu (ayu-dark.json, ayu-light.json).
// - Lilac: Catppuccin Mocha and Latte, from catppuccin/vscode (packages/catppuccin-vsc/src/theme/tokens).
// - Chartreux: Everforest Dark and Light (medium), from sainnhe/everforest-vscode (src/syntax, src/palette).
// - Tuxedo: Alabaster Dark and Alabaster, from tonsky/sublime-scheme-alabaster. It only colors strings,
//   constants, comments and definitions, and leaves keywords, types and calls in the text color.
// Font styles stay as in Russian Blue, so italics match across all themes.
//
// Usage: node scripts/build-variants.js

const fs = require("fs");
const path = require("path");

const themesDir = path.join(__dirname, "..", "themes");

const variants = [
	{
		file: "feles-siamese-dark-color-theme.json",
		base: "feles-russian-blue-dark-color-theme.json",
		name: "Feles Siamese Dark",
		type: "dark",
		scheme: "jetbrains",
		accent: {
			"#8abbaf": "#3574f0", // accent
			"#98c3b9": "#366ace", // accent hover
			"#0d1212": "#ffffff", // text on accent
			"#3f5050": "#2a4170", // text selection
			"#b6e3d6": "#99bbff", // match highlight on selection
			"#2f3a3c": "#1e2c49", // active activity bar button
			"#4b6260": "#25437d" // list, palette and autocomplete selection
		},
		code: {
			fg: "#bcbec4", keyword: "#cf8e6d", string: "#6aab73", number: "#2aacb8", comment: "#7a7e85",
			docComment: "#5f826b", constant: "#c77dbb", function: "#56a8f5", metadata: "#b3ae60", typeParameter: "#16baac",
			tag: "#d5b778", attribute: "#bcbec4", escape: "#cf8e6d", regexp: "#42c3d4", component: "#2fbaa3", globalVariable: "#c77dba",
			self: "#94558d", builtin: "#8888c6", keywordArgument: "#aa4926", dunder: "#b200b2"
		},
		// Russian Blue syntax color -> scheme role
		syntax: {
			"#d8dee9": "fg", "#a3adbd": "fg", "#9dd0b4": "fg", "#81a1c1": "keyword", "#a3be8c": "string",
			"#b4a08e": "number", "#7a87a1": "comment", "#b48ead": "constant", "#c5cedb": "constant", "#b1d9e6": "function"
		},
		icons: { "#9dd0b4": "typeParameter" },
		overrides: {
			"textLink.foreground": "#548af7",
			"textLink.activeForeground": "#6b9bfa",
			"editor.findMatchBackground": "#114957",
			"editor.findMatchBorder": "#165e70",
			"editor.findMatchHighlightBackground": "#11495799",
			// Git graph labels share one text color across the blue ref and the pastel remote and base refs,
			// and white is unreadable on the pastels
			"scmGraph.historyItemHoverLabelForeground": "#000000"
		}
	},
	{
		file: "feles-siamese-light-color-theme.json",
		base: "feles-russian-blue-light-color-theme.json",
		name: "Feles Siamese Light",
		type: "light",
		scheme: "jetbrains",
		accent: {
			"#377263": "#2b62d9", // accent, a step deeper than Siamese Dark's #3574f0
			"#2f6155": "#2556c2", // accent hover
			"#c3d8d2": "#a6d2ff", // text selection
			"#1f4f43": "#315fbd", // match highlight on selection
			"#d0e0db": "#d0def8", // active activity bar button
			"#b8cfc8": "#b8cefa" // list, palette and autocomplete selection
		},
		code: {
			fg: "#080808", keyword: "#0033b3", string: "#067d17", number: "#1750eb", comment: "#8c8c8c",
			docComment: "#8c8c8c", constant: "#871094", function: "#00627a", metadata: "#9e880d", typeParameter: "#007e8a",
			tag: "#0033b3", attribute: "#174ad4", escape: "#0037a6", regexp: "#264eff", component: "#008077", globalVariable: "#830091",
			self: "#94558d", builtin: "#000080", keywordArgument: "#660099", dunder: "#b200b2"
		},
		syntax: {
			"#2e3440": "fg", "#5c6779": "fg", "#2f7356": "fg", "#4c6a92": "keyword", "#48712d": "string",
			"#7d6650": "number", "#636e81": "comment", "#85578a": "constant", "#3b4252": "constant", "#2c6c80": "function"
		},
		icons: { "#2f7356": "typeParameter" },
		overrides: {
			"editor.wordHighlightBackground": "#edebfc",
			"editor.findMatchBackground": "#fcd47e",
			"editor.findMatchBorder": "#00000000",
			"editor.findMatchHighlightBackground": "#fcd47e80",
			"editorBracketMatch.background": "#93d9d9"
		}
	},
	{
		file: "feles-marmalade-dark-color-theme.json",
		base: "feles-russian-blue-dark-color-theme.json",
		name: "Feles Marmalade Dark",
		type: "dark",
		accent: {
			"#8abbaf": "#d7a54b", // accent
			"#98c3b9": "#e0b462", // accent hover
			"#0d1212": "#1a1408", // text on accent
			"#3f5050": "#574930", // text selection
			"#b6e3d6": "#f0d49a", // match highlight on selection
			"#2f3a3c": "#3e3628", // active activity bar button
			"#4b6260": "#6e5933" // list, palette and autocomplete selection
		},
		scheme: "ayu",
		code: {
			fg: "#bfbdb6", keyword: "#ff8f40", operator: "#f29668", string: "#aad94c", number: "#d2a6ff", comment: "#5a6673",
			constant: "#d2a6ff", function: "#ffb454", type: "#59c2ff", libraryType: "#39bae6", member: "#f07178",
			regexp: "#95e6cb", tag: "#39bae6", attribute: "#ffb454", decorator: "#e6c08a", languageVariable: "#39bae6",
			parameter: "#d2a6ff", libraryFunction: "#f07178", added: "#70bf56", modified: "#73b8ff", removed: "#f26d78"
		},
		syntax: {
			"#d8dee9": "fg", "#a3adbd": "fg", "#9dd0b4": "type", "#81a1c1": "keyword", "#a3be8c": "string",
			"#b4a08e": "number", "#7a87a1": "comment", "#b48ead": "constant", "#c5cedb": "member", "#b1d9e6": "function"
		},
		icons: {},
		overrides: {}
	},
	{
		file: "feles-marmalade-light-color-theme.json",
		base: "feles-russian-blue-light-color-theme.json",
		name: "Feles Marmalade Light",
		type: "light",
		accent: {
			"#377263": "#9a6700", // accent
			"#2f6155": "#855900", // accent hover
			"#c3d8d2": "#e1d1b3", // text selection
			"#1f4f43": "#6e4a00", // match highlight on selection
			"#d0e0db": "#e4dbc8", // active activity bar button
			"#b8cfc8": "#dccaa6" // list, palette and autocomplete selection
		},
		scheme: "ayu",
		code: {
			fg: "#5c6166", keyword: "#fa8532", operator: "#f2a191", string: "#86b300", number: "#a37acc", comment: "#adaeb1",
			constant: "#a37acc", function: "#eba400", type: "#22a4e6", libraryType: "#55b4d4", member: "#f07171",
			regexp: "#4cbf99", tag: "#55b4d4", attribute: "#eba400", decorator: "#e59645", languageVariable: "#55b4d4",
			parameter: "#a37acc", libraryFunction: "#f07171", added: "#6cbf43", modified: "#478acc", removed: "#ff7383"
		},
		syntax: {
			"#2e3440": "fg", "#5c6779": "fg", "#2f7356": "type", "#4c6a92": "keyword", "#48712d": "string",
			"#7d6650": "number", "#636e81": "comment", "#85578a": "constant", "#3b4252": "member", "#2c6c80": "function"
		},
		icons: {},
		overrides: {}
	},
	{
		file: "feles-lilac-dark-color-theme.json",
		base: "feles-russian-blue-dark-color-theme.json",
		name: "Feles Lilac Dark",
		type: "dark",
		accent: {
			"#8abbaf": "#a895db", // accent
			"#98c3b9": "#b4a3e2", // accent hover
			"#0d1212": "#16121f", // text on accent
			"#3f5050": "#443f5c", // text selection
			"#b6e3d6": "#d9ccf5", // match highlight on selection
			"#2f3a3c": "#332f42", // active activity bar button
			"#4b6260": "#4f4870" // list, palette and autocomplete selection
		},
		scheme: "catppuccin",
		// Catppuccin Mocha
		code: {
			fg: "#cdd6f4", punctuation: "#9399b2", comment: "#9399b2", string: "#a6e3a1", escape: "#f5c2e7", constant: "#fab387",
			keyword: "#cba6f7", operator: "#94e2d5", function: "#89b4fa", type: "#f9e2af", enumMember: "#94e2d5", parameter: "#eba0ac",
			builtin: "#f38ba8", tag: "#89b4fa", attribute: "#f9e2af"
		},
		syntax: {
			"#d8dee9": "fg", "#a3adbd": "punctuation", "#9dd0b4": "type", "#81a1c1": "keyword", "#a3be8c": "string",
			"#b4a08e": "constant", "#7a87a1": "comment", "#b48ead": "constant", "#c5cedb": "fg", "#b1d9e6": "function"
		},
		icons: {},
		overrides: {}
	},
	{
		file: "feles-lilac-light-color-theme.json",
		base: "feles-russian-blue-light-color-theme.json",
		name: "Feles Lilac Light",
		type: "light",
		accent: {
			"#377263": "#7651c2", // accent
			"#2f6155": "#6845ad", // accent hover
			"#c3d8d2": "#dcd0f2", // text selection
			"#1f4f43": "#4f2f94", // match highlight on selection
			"#d0e0db": "#e3dcf1", // active activity bar button
			"#b8cfc8": "#d5caee" // list, palette and autocomplete selection
		},
		scheme: "catppuccin",
		// Catppuccin Latte
		code: {
			fg: "#4c4f69", punctuation: "#7c7f93", comment: "#7c7f93", string: "#40a02b", escape: "#ea76cb", constant: "#fe640b",
			keyword: "#8839ef", operator: "#179299", function: "#1e66f5", type: "#df8e1d", enumMember: "#179299", parameter: "#e64553",
			builtin: "#d20f39", tag: "#1e66f5", attribute: "#df8e1d"
		},
		syntax: {
			"#2e3440": "fg", "#5c6779": "punctuation", "#2f7356": "type", "#4c6a92": "keyword", "#48712d": "string",
			"#7d6650": "constant", "#636e81": "comment", "#85578a": "constant", "#3b4252": "fg", "#2c6c80": "function"
		},
		icons: {},
		overrides: {}
	},
	{
		file: "feles-chartreux-dark-color-theme.json",
		base: "feles-russian-blue-dark-color-theme.json",
		name: "Feles Chartreux Dark",
		type: "dark",
		accent: {
			"#8abbaf": "#a7c080", // accent
			"#98c3b9": "#b3c991", // accent hover
			"#0d1212": "#141a0c", // text on accent
			"#3f5050": "#424d38", // text selection
			"#b6e3d6": "#d5e5bd", // match highlight on selection
			"#2f3a3c": "#333a2c", // active activity bar button
			"#4b6260": "#4d5a3e" // list, palette and autocomplete selection
		},
		scheme: "everforest",
		// Everforest Dark, medium
		code: {
			fg: "#d3c6aa", comment: "#859289", red: "#e67e80", orange: "#e69875", yellow: "#dbbc7f", green: "#a7c080",
			aqua: "#83c092", blue: "#7fbbb3", purple: "#d699b6"
		},
		syntax: {
			"#d8dee9": "fg", "#a3adbd": "fg", "#9dd0b4": "blue", "#81a1c1": "red", "#a3be8c": "yellow",
			"#b4a08e": "purple", "#7a87a1": "comment", "#b48ead": "purple", "#c5cedb": "fg", "#b1d9e6": "green"
		},
		icons: {},
		overrides: {}
	},
	{
		file: "feles-chartreux-light-color-theme.json",
		base: "feles-russian-blue-light-color-theme.json",
		name: "Feles Chartreux Light",
		type: "light",
		accent: {
			"#377263": "#5f7d2e", // accent
			"#2f6155": "#536d28", // accent hover
			"#c3d8d2": "#d9e4c6", // text selection
			"#1f4f43": "#3f5a14", // match highlight on selection
			"#d0e0db": "#e0e7d3", // active activity bar button
			"#b8cfc8": "#d0dcba" // list, palette and autocomplete selection
		},
		scheme: "everforest",
		// Everforest Light, medium
		code: {
			fg: "#5c6a72", comment: "#939f91", red: "#f85552", orange: "#f57d26", yellow: "#dfa000", green: "#8da101",
			aqua: "#35a77c", blue: "#3a94c5", purple: "#df69ba"
		},
		syntax: {
			"#2e3440": "fg", "#5c6779": "fg", "#2f7356": "blue", "#4c6a92": "red", "#48712d": "yellow",
			"#7d6650": "purple", "#636e81": "comment", "#85578a": "purple", "#3b4252": "fg", "#2c6c80": "green"
		},
		icons: {},
		overrides: {}
	},
	{
		file: "feles-tuxedo-dark-color-theme.json",
		base: "feles-russian-blue-dark-color-theme.json",
		name: "Feles Tuxedo Dark",
		type: "dark",
		accent: {
			"#8abbaf": "#b4b9c2", // accent
			"#98c3b9": "#c3c7cf", // accent hover
			"#0d1212": "#16181c", // text on accent
			"#3f5050": "#3c4048", // text selection
			"#b6e3d6": "#e2e4e8", // match highlight on selection
			"#2f3a3c": "#2f3237", // active activity bar button
			"#4b6260": "#464a52" // list, palette and autocomplete selection
		},
		scheme: "alabaster",
		// Alabaster Dark
		code: {
			fg: "#cecece", punctuation: "#708b8d", comment: "#dfdf8e", string: "#95cb82", constant: "#cc8bc9", definition: "#71ade7"
		},
		syntax: {
			"#d8dee9": "fg", "#a3adbd": "punctuation", "#9dd0b4": "fg", "#81a1c1": "fg", "#a3be8c": "string",
			"#b4a08e": "constant", "#7a87a1": "comment", "#b48ead": "fg", "#c5cedb": "fg", "#b1d9e6": "fg"
		},
		// Classes and functions keep a color in the outline and autocomplete
		icons: { "#9dd0b4": "definition", "#b1d9e6": "definition", "#b48ead": "constant" },
		overrides: {
			// A gray link would read as plain text
			"textLink.foreground": "#71ade7",
			"textLink.activeForeground": "#8dbdec"
		}
	},
	{
		file: "feles-tuxedo-light-color-theme.json",
		base: "feles-russian-blue-light-color-theme.json",
		name: "Feles Tuxedo Light",
		type: "light",
		accent: {
			"#377263": "#5a6372", // accent, the light counterpart of Tuxedo Dark's silver
			"#2f6155": "#4d5562", // accent hover
			"#c3d8d2": "#d5dae2", // text selection
			"#1f4f43": "#2f3540", // match highlight on selection
			"#d0e0db": "#dde1e7", // active activity bar button
			"#b8cfc8": "#cfd5de" // list, palette and autocomplete selection
		},
		scheme: "alabaster",
		// Alabaster
		code: {
			fg: "#000000", punctuation: "#777777", comment: "#aa3731", string: "#448c27", constant: "#7a3e9d", definition: "#325cc0"
		},
		syntax: {
			"#2e3440": "fg", "#5c6779": "punctuation", "#2f7356": "fg", "#4c6a92": "fg", "#48712d": "string",
			"#7d6650": "constant", "#636e81": "comment", "#85578a": "fg", "#3b4252": "fg", "#2c6c80": "fg"
		},
		icons: { "#2f7356": "definition", "#2c6c80": "definition", "#85578a": "constant" },
		overrides: {
			"textLink.foreground": "#325cc0",
			"textLink.activeForeground": "#2a4ea3"
		}
	}
];

// Scope rules added after Russian Blue's own (mapped) rules, so they win on equal specificity.
// They only set colors; font styles come from Russian Blue's rules.
const jetbrainsRules = (c) => [
	{ name: "Comment", scope: ["comment", "punctuation.definition.comment"], settings: { foreground: c.comment } },
	{ name: "Doc Comment", scope: ["comment.block.documentation", "string.quoted.docstring"], settings: { foreground: c.docComment } },
	{ name: "Operators", scope: ["keyword.operator", "punctuation.separator", "punctuation.accessor"], settings: { foreground: c.fg } },
	{
		name: "Word Operators",
		scope: ["keyword.operator.new", "keyword.operator.expression", "keyword.operator.logical.python", "keyword.operator.word", "keyword.operator.in", "keyword.operator.instanceof", "keyword.operator.typeof"],
		settings: { foreground: c.keyword }
	},
	{ name: "Language Constants", scope: ["constant.language", "variable.language"], settings: { foreground: c.keyword } },
	{ name: "Constants", scope: ["variable.other.constant", "constant.other", "variable.other.enummember"], settings: { foreground: c.constant } },
	{ name: "Escapes", scope: "constant.character.escape", settings: { foreground: c.escape } },
	{ name: "Regexp", scope: "string.regexp", settings: { foreground: c.regexp } },
	{ name: "Types", scope: ["entity.name.type", "entity.name.class", "entity.other.inherited-class", "support.class", "support.type", "storage.type.java", "storage.type.cs"], settings: { foreground: c.fg } },
	{ name: "Type Parameters", scope: "entity.name.type.parameter", settings: { foreground: c.typeParameter } },
	{ name: "Function Declaration", scope: "entity.name.function", settings: { foreground: c.function } },
	{
		name: "Function Call",
		scope: ["meta.function-call entity.name.function", "meta.function-call.generic", "meta.method-call entity.name.function", "support.function"],
		settings: { foreground: c.fg }
	},
	{
		name: "Fields",
		scope: ["variable.other.property", "variable.other.object.property", "support.variable.property", "meta.object-literal.key", "variable.other.member", "support.type.property-name.json"],
		settings: { foreground: c.constant }
	},
	{ name: "Variables", scope: ["variable", "variable.parameter", "variable.other"], settings: { foreground: c.fg } },
	{
		name: "Annotations and Decorators",
		scope: ["meta.decorator", "meta.decorator entity.name.function", "punctuation.decorator", "storage.type.annotation", "punctuation.definition.annotation", "entity.name.function.decorator", "punctuation.definition.decorator"],
		settings: { foreground: c.metadata }
	},
	{ name: "Tags", scope: ["entity.name.tag", "punctuation.definition.tag"], settings: { foreground: c.tag } },
	{ name: "Components", scope: ["support.class.component", "entity.name.tag.custom"], settings: { foreground: c.component } },
	{ name: "Attributes", scope: "entity.other.attribute-name", settings: { foreground: c.attribute } },
	{ name: "[Python] Self", scope: ["variable.language.special.self.python", "variable.parameter.function.language.special.self.python", "variable.language.special.cls.python", "variable.parameter.function.language.special.cls.python"], settings: { foreground: c.self } },
	{ name: "[Python] Builtins", scope: ["support.function.builtin.python", "support.type.python", "support.type.exception.python"], settings: { foreground: c.builtin } },
	{ name: "[Python] Dunders", scope: ["support.function.magic.python", "support.variable.magic.python"], settings: { foreground: c.dunder } },
	{ name: "[Python] Keyword Arguments", scope: "variable.parameter.function-call.python", settings: { foreground: c.keywordArgument } }
];

const jetbrainsSemantic = (c) => ({
	"class": c.fg, "interface": c.fg, "type": c.fg, "enum": c.fg, "struct": c.fg, "namespace": c.fg,
	"typeParameter": c.typeParameter,
	"function": c.fg, "method": c.fg,
	"function.declaration": c.function, "method.declaration": c.function,
	"parameter": c.fg, "variable": c.fg,
	"property": c.constant,
	"enumMember": c.constant,
	"variable.defaultLibrary": c.globalVariable,
	"decorator": c.metadata, "macro": c.metadata,
	"selfParameter": c.self, "clsParameter": c.self,
	"*.builtin": c.builtin,
	"*.deprecated": { strikethrough: true }
});

// Ayu's scope rules, from ayu-dark.json / ayu-light.json.
const ayuRules = (c) => [
	{ name: "Operators", scope: ["keyword.operator", "punctuation.accessor"], settings: { foreground: c.operator } },
	{
		name: "Word Operators",
		scope: ["keyword.operator.new", "keyword.operator.expression", "keyword.operator.logical.python", "keyword.operator.word", "keyword.operator.in", "keyword.operator.instanceof", "keyword.operator.typeof"],
		settings: { foreground: c.keyword }
	},
	{ name: "Separators", scope: ["punctuation.separator", "punctuation.terminator", "punctuation.section"], settings: { foreground: c.fg } },
	{ name: "Lambda Arrow", scope: ["storage", "storage.type.function", "punctuation.definition.template-expression"], settings: { foreground: c.keyword } },
	{ name: "Built-in Constants", scope: "constant.language", settings: { foreground: c.constant } },
	{ name: "Regexp and Escapes", scope: ["string.regexp", "constant.character", "constant.character.escape", "constant.other"], settings: { foreground: c.regexp } },
	{ name: "Language Variables", scope: ["variable.language", "variable.parameter.function.language.special.self.python", "variable.parameter.function.language.special.cls.python"], settings: { foreground: c.languageVariable } },
	{ name: "Types", scope: ["entity.name", "entity.name.type", "entity.name.class", "support.class.component", "source.java storage.type", "source.c storage.type"], settings: { foreground: c.type } },
	{ name: "Library Types", scope: ["support.type", "support.class", "entity.other.inherited-class", "source.java storage.type.primitive"], settings: { foreground: c.libraryType } },
	{ name: "Function Name", scope: ["entity.name.function", "variable.function", "meta.function-call.generic", "meta.function-call entity.name.function", "meta.method-call entity.name.function"], settings: { foreground: c.function } },
	{ name: "Library Function", scope: ["support.function", "support.macro"], settings: { foreground: c.libraryFunction } },
	{ name: "Variables", scope: ["variable", "variable.parameter.function-call", "variable.other.property", "variable.other.object.property", "support.variable.property", "meta.object-literal.key", "variable.other.member"], settings: { foreground: c.fg } },
	{ name: "Member Variable", scope: "variable.member", settings: { foreground: c.member } },
	{ name: "Function Arguments", scope: ["variable.parameter", "meta.parameter"], settings: { foreground: c.parameter } },
	{ name: "Imports", scope: ["entity.name.import", "entity.name.package"], settings: { foreground: c.string } },
	{ name: "Tags", scope: ["entity.name.tag", "meta.tag.sgml", "punctuation.definition.tag"], settings: { foreground: c.tag } },
	{ name: "Tag Attributes", scope: "entity.other.attribute-name", settings: { foreground: c.attribute } },
	{ name: "CSS Pseudo-class", scope: "entity.other.attribute-name.pseudo-class", settings: { foreground: c.regexp } },
	{ name: "Library Constants", scope: "support.constant", settings: { foreground: c.operator } },
	{
		name: "Decorators and Annotations",
		scope: ["meta.decorator", "meta.decorator variable.other", "meta.decorator entity.name.function", "punctuation.decorator", "storage.type.annotation", "punctuation.definition.annotation", "entity.name.function.decorator", "punctuation.definition.decorator"],
		settings: { foreground: c.decorator }
	},
	{ name: "Property Names", scope: "support.type.property-name", settings: { foreground: c.libraryType } },
	{ name: "Markup Heading", scope: ["markup.heading", "markup.heading entity.name"], settings: { foreground: c.string } },
	{ name: "Markup Links", scope: ["markup.underline.link", "string.other.link"], settings: { foreground: c.tag } },
	{ name: "Markup Emphasis", scope: ["markup.italic", "emphasis", "markup.bold"], settings: { foreground: c.member } },
	{ name: "Markup Quote", scope: "markup.quote", settings: { foreground: c.regexp } },
	{ name: "Markup List Bullet", scope: "markup.list punctuation.definition.list.begin", settings: { foreground: c.function } },
	{ name: "Markup Added", scope: "markup.inserted", settings: { foreground: c.added } },
	{ name: "Markup Modified", scope: "markup.changed", settings: { foreground: c.modified } },
	{ name: "Markup Removed", scope: "markup.deleted", settings: { foreground: c.removed } }
];

const ayuSemantic = (c) => ({
	"class": c.type, "enum": c.type, "struct": c.type, "type": c.type, "interface": c.libraryType,
	"class.defaultLibrary": c.libraryType, "enum.defaultLibrary": c.libraryType, "struct.defaultLibrary": c.libraryType,
	"type.defaultLibrary": c.libraryType, "interface.defaultLibrary": c.libraryType,
	"enumMember": c.regexp,
	"function": c.function, "method": c.function,
	"macro": c.decorator, "decorator": c.decorator,
	"parameter": c.parameter, "property": c.fg, "variable": c.fg,
	"selfParameter": c.languageVariable, "clsParameter": c.languageVariable,
	"comment": c.comment, "string": c.string, "keyword": c.keyword, "number": c.number, "regexp": c.regexp, "operator": c.operator,
	"*.deprecated": { strikethrough: true }
});

// Catppuccin's scope rules, from packages/catppuccin-vsc/src/theme/tokens (index.ts and html.ts).
const catppuccinRules = (c) => [
	{ name: "Variables", scope: ["variable", "variable.other.readwrite", "variable.other.property", "variable.other.object.property", "meta.object-literal.key"], settings: { foreground: c.fg } },
	{ name: "Punctuation", scope: "punctuation", settings: { foreground: c.punctuation } },
	{ name: "Comments", scope: ["comment", "punctuation.definition.comment"], settings: { foreground: c.comment } },
	{ name: "Strings", scope: ["string", "punctuation.definition.string"], settings: { foreground: c.string } },
	{ name: "Escapes and Regexp", scope: ["constant.character.escape", "string.regexp"], settings: { foreground: c.escape } },
	{
		name: "Booleans, Constants and Numbers",
		scope: ["constant.numeric", "variable.other.constant", "entity.name.constant", "constant.language.boolean", "constant.language.false", "constant.language.true", "constant.other"],
		settings: { foreground: c.constant }
	},
	{
		name: "Keywords",
		scope: ["keyword", "keyword.operator.word", "keyword.operator.new", "keyword.operator.expression", "variable.language.super", "support.type.primitive", "storage.type", "storage.modifier", "punctuation.definition.keyword"],
		settings: { foreground: c.keyword }
	},
	{
		name: "Operators",
		scope: ["keyword.operator", "punctuation.accessor", "punctuation.definition.generic", "punctuation.definition.tag", "punctuation.separator.key-value"],
		settings: { foreground: c.operator }
	},
	{
		name: "Functions",
		scope: ["entity.name.function", "meta.function-call.method", "support.function", "variable.function", "meta.function-call entity.name.function", "meta.method-call entity.name.function"],
		settings: { foreground: c.function }
	},
	{
		name: "Classes and Types",
		scope: ["entity.name.class", "entity.other.inherited-class", "support.class", "entity.name.struct", "entity.name.enum", "entity.name.type", "support.type", "entity.name.namespace", "keyword.control.directive"],
		settings: { foreground: c.type }
	},
	{ name: "Enum Members", scope: ["variable.other.enummember", "meta.enum variable.other.readwrite"], settings: { foreground: c.enumMember } },
	{
		name: "Decorators",
		scope: ["meta.decorator", "punctuation.decorator", "entity.name.function.decorator", "storage.type.annotation", "punctuation.definition.annotation", "meta.annotation variable.function"],
		settings: { foreground: c.constant }
	},
	{ name: "Parameters", scope: ["variable.parameter", "meta.function.parameters"], settings: { foreground: c.parameter } },
	{
		name: "Built-ins and Self",
		scope: ["constant.language", "support.function.builtin", "variable.language.this", "variable.language.self", "variable.language.special.self.python", "variable.parameter.function.language.special.self.python"],
		settings: { foreground: c.builtin }
	},
	{ name: "Property Names", scope: ["support.type.property-name", "support.type.property-name.json"], settings: { foreground: c.function } },
	{ name: "Tags", scope: "entity.name.tag", settings: { foreground: c.tag } },
	{ name: "Components", scope: ["support.class.component", "entity.name.tag.custom"], settings: { foreground: c.type } },
	{ name: "Tag Attributes", scope: "entity.other.attribute-name", settings: { foreground: c.attribute } },
	{ name: "String Interpolation", scope: ["string.template variable", "string variable", "meta.template.expression"], settings: { foreground: c.fg } }
];

const catppuccinSemantic = (c) => ({
	"class": c.type, "interface": c.type, "enum": c.type, "struct": c.type, "type": c.type, "namespace": c.type, "typeParameter": c.type,
	"function": c.function, "method": c.function, "decorator": c.constant, "macro": c.function,
	"parameter": c.parameter, "variable": c.fg, "property": c.fg,
	"enumMember": c.enumMember, "variable.readonly": c.fg, "selfKeyword": c.builtin, "selfParameter": c.builtin,
	"variable.defaultLibrary": c.parameter, "boolean": c.constant, "number": c.constant,
	"*.deprecated": { strikethrough: true }
});

// Everforest's scope rules, from src/syntax/default.ts. The general rules only; its per-language rules are left out.
const everforestRules = (c) => [
	{ name: "Identifiers", scope: ["variable", "support.variable", "meta.definition.variable"], settings: { foreground: c.fg } },
	{
		name: "Properties",
		scope: ["variable.object.property", "support.variable.property", "variable.other.property", "variable.other.object.property", "variable.other.enummember", "variable.other.member", "meta.object-literal.key"],
		settings: { foreground: c.fg }
	},
	{ name: "Delimiters", scope: ["punctuation", "meta.brace", "meta.delimiter", "meta.bracket"], settings: { foreground: c.fg } },
	{ name: "Comments", scope: ["comment", "string.comment", "punctuation.definition.comment"], settings: { foreground: c.comment } },
	{ name: "Storage", scope: ["storage", "storage.modifier", "keyword.var", "entity.name.tag", "keyword.control.case", "keyword.control.switch"], settings: { foreground: c.orange } },
	{ name: "Operators", scope: "keyword.operator", settings: { foreground: c.orange } },
	{
		name: "Keywords",
		scope: ["keyword", "storage.type.function", "storage.type.class", "storage.type.enum", "storage.type.interface", "storage.type.property", "keyword.operator.new", "keyword.operator.expression", "keyword.operator.delete", "storage.type.extends"],
		settings: { foreground: c.red }
	},
	{ name: "Strings", scope: ["string", "punctuation.definition.string.begin", "punctuation.definition.string.end", "punctuation.definition.string.template.begin", "punctuation.definition.string.template.end"], settings: { foreground: c.yellow } },
	{ name: "Attributes", scope: "entity.other.attribute-name", settings: { foreground: c.yellow } },
	{
		name: "String Escapes",
		scope: ["constant.character.escape", "punctuation.quasi.element", "punctuation.definition.template-expression", "punctuation.section.embedded", "storage.type.format", "constant.other.placeholder", "variable.interpolation"],
		settings: { foreground: c.green }
	},
	{
		name: "Functions",
		scope: ["entity.name.function", "support.function", "variable.function", "meta.function-call entity.name.function", "meta.method-call entity.name.function", "meta.definition.method entity.name.function"],
		settings: { foreground: c.green }
	},
	{
		name: "Preprocessor and Annotations",
		scope: ["keyword.control.at-rule", "keyword.control.import", "keyword.control.export", "storage.type.namespace", "punctuation.decorator", "keyword.control.directive", "keyword.preprocessor", "punctuation.definition.preprocessor", "punctuation.definition.directive", "keyword.other.import", "keyword.other.package", "entity.name.type.namespace", "entity.name.scope-resolution", "keyword.other.using", "keyword.package", "keyword.import", "keyword.map", "storage.type.annotation", "meta.decorator", "entity.name.function.decorator"],
		settings: { foreground: c.aqua }
	},
	{ name: "Labels", scope: ["entity.name.label", "constant.other.label"], settings: { foreground: c.aqua } },
	{ name: "Modules", scope: ["support.module", "support.node", "support.other.module", "support.type.object.module", "entity.name.type.module", "entity.name.type.class.module", "keyword.control.module"], settings: { foreground: c.aqua } },
	{ name: "Types", scope: ["storage.type", "support.type", "entity.name.type", "keyword.type"], settings: { foreground: c.blue } },
	{ name: "Classes", scope: ["entity.name.type.class", "support.class", "entity.name.class", "entity.other.inherited-class", "storage.class"], settings: { foreground: c.blue } },
	{ name: "Numbers", scope: "constant.numeric", settings: { foreground: c.purple } },
	{ name: "Booleans", scope: "constant.language.boolean", settings: { foreground: c.purple } },
	{ name: "Macros", scope: "entity.name.function.preprocessor", settings: { foreground: c.purple } },
	{
		name: "Special Identifiers",
		scope: ["variable.language.this", "variable.language.self", "variable.language.super", "keyword.other.this", "variable.language.special", "constant.language.null", "constant.language.undefined", "constant.language.nan", "variable.parameter.function.language.special.self.python"],
		settings: { foreground: c.purple }
	},
	{ name: "Constants", scope: ["constant.language", "support.constant"], settings: { foreground: c.purple } },
	{ name: "Regexp", scope: "string.regexp", settings: { foreground: c.green } },
	{ name: "Components", scope: ["support.class.component", "entity.name.tag.custom"], settings: { foreground: c.blue } },
	// JavaScript and TypeScript
	{ name: "[JS/TS] Declarations", scope: ["storage.type.js", "storage.type.ts", "storage.type.tsx", "storage.type.function.arrow", "storage.type.type.ts", "storage.type.type.tsx"], settings: { foreground: c.orange } },
	{
		name: "[TS] Types",
		scope: ["entity.name.type.ts", "entity.name.type.interface.ts", "entity.other.inherited-class.ts", "entity.name.type.alias.ts", "entity.name.type.class.ts", "entity.name.type.enum.ts", "entity.name.type.tsx", "entity.name.type.interface.tsx", "entity.other.inherited-class.tsx", "entity.name.type.alias.tsx", "entity.name.type.class.tsx", "entity.name.type.enum.tsx"],
		settings: { foreground: c.aqua }
	},
	{ name: "[JS/TS] Imports", scope: ["keyword.control.import.ts", "keyword.control.export.ts", "storage.type.namespace.ts", "keyword.control.import.tsx", "keyword.control.export.tsx"], settings: { foreground: c.purple } },
	{
		name: "[JS/TS] Accessors",
		scope: ["punctuation.accessor.js", "punctuation.accessor.ts", "punctuation.accessor.tsx", "punctuation.separator.key-value.js", "punctuation.separator.key-value.ts", "keyword.operator.type.annotation.ts", "keyword.operator.type.annotation.tsx"],
		settings: { foreground: c.comment }
	},
	{ name: "Markup Heading", scope: ["markup.heading", "markup.heading entity.name"], settings: { foreground: c.orange } },
	{ name: "Markup Links", scope: ["string.other.link.title.markdown", "string.other.link.description.markdown"], settings: { foreground: c.purple } },
	{ name: "Markup Code", scope: ["markup.fenced_code.block.markdown", "markup.inline.raw.string.markdown"], settings: { foreground: c.green } }
];

const everforestSemantic = (c) => ({
	"class": c.aqua, "interface": c.aqua, "enum": c.purple, "enumMember": c.blue, "namespace": c.purple,
	"type": c.blue, "typeParameter": c.blue, "struct": c.blue,
	"function": c.green, "method": c.green, "macro": c.aqua, "decorator": c.aqua,
	"parameter": c.fg, "variable": c.fg, "property": c.fg,
	"variable.defaultLibrary": c.purple, "property.defaultLibrary": c.purple,
	"selfKeyword": c.purple, "selfParameter": c.purple, "operatorOverload": c.orange, "memberOperatorOverload": c.orange,
	"*.deprecated": { strikethrough: true }
});

// Alabaster's four colors, from Alabaster.sublime-color-scheme and Alabaster Dark.sublime-color-scheme.
// Anything else, keywords and types included, is plain text. Definitions get a color, uses of them don't.
const alabasterRules = (c) => [
	{
		name: "Plain Text",
		scope: ["keyword", "storage", "variable", "support", "entity.name.tag", "entity.other", "meta.decorator", "punctuation.decorator"],
		settings: { foreground: c.fg }
	},
	{ name: "Punctuation", scope: ["punctuation", "keyword.operator", "constant.character.escape"], settings: { foreground: c.punctuation } },
	{ name: "Word Operators", scope: ["keyword.operator.new", "keyword.operator.expression", "keyword.operator.word", "keyword.operator.logical.python", "keyword.operator.in", "keyword.operator.instanceof", "keyword.operator.typeof"], settings: { foreground: c.fg } },
	{ name: "Comments", scope: ["comment", "punctuation.definition.comment"], settings: { foreground: c.comment } },
	{ name: "Strings", scope: ["string", "string.regexp", "constant.other.symbol", "punctuation.definition.string"], settings: { foreground: c.string } },
	{ name: "Constants", scope: ["constant", "constant.numeric", "constant.character", "constant.language", "constant.keyword", "punctuation.definition.constant"], settings: { foreground: c.constant } },
	{ name: "Definitions", scope: ["entity.name", "meta.definition.method entity.name.function", "meta.definition.function entity.name.function"], settings: { foreground: c.definition } },
	{
		name: "Uses",
		scope: ["entity.name.tag", "meta.function-call entity.name.function", "meta.method-call entity.name.function", "meta.function-call.generic", "entity.other.inherited-class", "meta.type.annotation entity.name.type", "meta.return.type entity.name.type", "meta.type.parameters entity.name.type", "new.expr entity.name.type"],
		settings: { foreground: c.fg }
	},
	{ name: "Markup Heading", scope: ["markup.heading", "markup.heading entity.name"], settings: { foreground: c.definition } }
];

const alabasterSemantic = (c) => ({
	"class": c.fg, "interface": c.fg, "enum": c.fg, "struct": c.fg, "type": c.fg, "namespace": c.fg, "typeParameter": c.fg,
	"function": c.fg, "method": c.fg, "decorator": c.fg, "macro": c.fg,
	"class.declaration": c.definition, "interface.declaration": c.definition, "enum.declaration": c.definition,
	"type.declaration": c.definition, "struct.declaration": c.definition,
	"function.declaration": c.definition, "method.declaration": c.definition,
	"parameter": c.fg, "variable": c.fg, "property": c.fg, "enumMember": c.fg,
	"*.deprecated": { strikethrough: true }
});

const schemes = {
	jetbrains: { rules: jetbrainsRules, semantic: jetbrainsSemantic },
	ayu: { rules: ayuRules, semantic: ayuSemantic },
	catppuccin: { rules: catppuccinRules, semantic: catppuccinSemantic },
	everforest: { rules: everforestRules, semantic: everforestSemantic },
	alabaster: { rules: alabasterRules, semantic: alabasterSemantic }
};

const base7 = (v) => v.slice(0, 7).toLowerCase();

for (const v of variants) {
	const base = JSON.parse(fs.readFileSync(path.join(themesDir, v.base), "utf8"));
	const role = (hex) => v.code && v.syntax[hex] && v.code[v.syntax[hex]];
	// Symbol icons give types their own color instead of JetBrains' plain text.
	const icon = (hex) => (v.code && v.icons[hex] ? v.code[v.icons[hex]] : role(hex));

	const colors = {};
	for (const [key, value] of Object.entries(base.colors)) {
		const hex = base7(value);
		let mapped = v.accent[hex];
		if (!mapped && /^(symbolIcon|debugTokenExpression)\./.test(key)) mapped = icon(hex);
		colors[key] = (mapped || hex) + value.slice(7);
	}
	if (v.code) colors["editor.foreground"] = v.code.fg;
	Object.assign(colors, v.overrides);

	const tokenColors = base.tokenColors.map((rule) => {
		const settings = { ...rule.settings };
		if (settings.foreground) settings.foreground = role(settings.foreground.toLowerCase()) || settings.foreground;
		return { ...rule, settings };
	});

	const theme = {
		name: v.name,
		type: v.type,
		semanticHighlighting: true,
		colors,
		tokenColors: v.code ? tokenColors.concat(schemes[v.scheme].rules(v.code)) : tokenColors,
		semanticTokenColors: v.code ? schemes[v.scheme].semantic(v.code) : base.semanticTokenColors
	};
	fs.writeFileSync(path.join(themesDir, v.file), JSON.stringify(theme, null, "\t") + "\n");
	console.log(`${v.file}: ${Object.keys(colors).length} colors, ${theme.tokenColors.length} token rules`);
}
