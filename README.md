# Feles

*Feles* is Latin for cat. Feles is a set of soft, JetBrains-inspired dark and light themes in four cat coats:

| Coat | Accent | Code colors |
|---|---|---|
| **Cinnamon** | Cherrywood red | Gatito, warm |
| **Russian Blue** | Teal | Nord |
| **Siamese** | JetBrains blue | JetBrains Islands Dark and IntelliJ Light |
| **Marmalade** | Gold | Ayu Dark and Ayu Light |

All four share the same low-contrast UI and italics, and each comes in a `Dark` and a `Light` version.

To install:
  1.  Open Extensions on the sidebar.
  2.  Search for Feles.
  3.  Install & reload.
  4.  ⌘ + ⇧ + P and type "Color Theme".
  5.  Pick a Feles theme from the list, for example `Feles Siamese Dark`, and hit enter.

To switch between the dark and light version with your system theme, add this to your settings:

```json
"window.autoDetectColorScheme": true,
"workbench.preferredDarkColorTheme": "Feles Siamese Dark",
"workbench.preferredLightColorTheme": "Feles Siamese Light"
```

### Coming from Gatito Nightly

Feles used to be called Gatito Nightly. The Red and Blue themes are now Cinnamon and Russian Blue, and keep their old setting names so existing settings keep working:

| Theme | Setting name |
|---|---|
| Feles Cinnamon Dark | `Gatito Nightly Red` |
| Feles Cinnamon Light | `Gatito Daylight Red` |
| Feles Russian Blue Dark | `Gatito Nightly Blue` |
| Feles Russian Blue Light | `Gatito Daylight Blue` |

Use these names for Cinnamon and Russian Blue in settings like `workbench.preferredDarkColorTheme`.

### Siamese

Siamese is inspired by JetBrains IDEs. It uses the JetBrains blue accent and the code colors of JetBrains' Islands Dark and IntelliJ Light schemes, including their semantic highlighting: fields in purple, declarations colored and calls left plain.

For the full look, these settings go well with it:

```json
"editor.fontFamily": "JetBrains Mono",
"editor.fontLigatures": true,
"workbench.tree.indent": 12,
"editor.bracketPairColorization.enabled": false
```

### Marmalade

Marmalade pairs its gold accent with the code colors of [Ayu](https://github.com/ayu-theme/vscode-ayu), whose signature accent is the same gold: orange keywords, golden function names, green strings and purple numbers.

### Building

Siamese and Marmalade are generated from Russian Blue. After changing a Russian Blue theme, run `node scripts/build-variants.js` to update them.

The previews below are taken by `npm run screenshots`, which opens VS Code with each theme and saves them to `images/`. Add a word to only take some, for example `npm run screenshots -- siamese`.

Each accent takes its code colors from an established scheme with a matching signature color: JetBrains for Siamese, Ayu for Marmalade.

### Credits

Feles started as a fork of [Gatito Theme](https://github.com/pawelgrzybek/gatito-theme) by Paweł Grzybek. Siamese's code colors come from the JetBrains Islands Dark and IntelliJ Light schemes, and Marmalade's from [Ayu](https://github.com/ayu-theme/vscode-ayu) by Ike Kurghinyan (MIT).

**Enjoy!**

### Previews

#### Feles Cinnamon Dark

![Feles Cinnamon Dark](./images/preview-cinnamon-dark.png "Feles Cinnamon Dark")

#### Feles Cinnamon Light

![Feles Cinnamon Light](./images/preview-cinnamon-light.png "Feles Cinnamon Light")

#### Feles Russian Blue Dark

![Feles Russian Blue Dark](./images/preview-russian-blue-dark.png "Feles Russian Blue Dark")

#### Feles Russian Blue Light

![Feles Russian Blue Light](./images/preview-russian-blue-light.png "Feles Russian Blue Light")

#### Feles Siamese Dark

![Feles Siamese Dark](./images/preview-siamese-dark.png "Feles Siamese Dark")

#### Feles Siamese Light

![Feles Siamese Light](./images/preview-siamese-light.png "Feles Siamese Light")

#### Feles Marmalade Dark

![Feles Marmalade Dark](./images/preview-marmalade-dark.png "Feles Marmalade Dark")

#### Feles Marmalade Light

![Feles Marmalade Light](./images/preview-marmalade-light.png "Feles Marmalade Light")
