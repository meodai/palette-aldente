# Palette Aldente 🍝

Introducing the ultimate color palette companion: **Palette Aldente** [alˈdɛnte]! Keep your favorite color schemes organized and easily accessible for all your creative needs.

- Makes sure your `yml` or `json` is actually valid
- Exports it to JSON
- Provides a handy JS wrapper that works everyhere. (Node, Browser, Codepen etc..)
- Exports a static SVG of all the palettes
- Exports PNG images of each palette.
- Provides a HTML templete with all the palletes. (Ideal for github pages)
- Ability to name your colors and palettes automatically
- Coverts almost any color format to any other.
- Possibility to additionally convert to different color formats: lab, lch, oklab, hsl, etc...

Open-sourcing your color palettes allows others to use and improve them, helps build your design expertise, and fosters collaboration within the community. This tool was built to make the process as easy and streamlined as possible. 

## Quickstart
  
```bash
npx palette-aldente ./src/palettes.yml --formats name,rgb,hsl
```

## Use to publish your palettes

1. `npm install palette-aldente --save-dev`
2. Create a [`json`](https://github.com/studioyorktown/coloryorktownhall/blob/main/src/merged.json) or [`yml`](https://github.com/meodai/palette-aldente/blob/main/src/palettes.yml) file containing your colors.
3. Edit your `package.json` to build your actual palette ex: 
```js
//...
"scripts": {
    "build": "palette-aldente ./yourcolors.json",
}
```
5. `npm run build` to build the project.
6. Find your build in the `dist/` folder.
7. Optionally use [this workflow](https://github.com/meodai/palette-aldente/blob/main/.github/workflows/node.js.yml) to automatically publish all changes to github pages.

## CLI Manual

```bash
$ npx palette-aldente ./mypalettes.yml 
$ palette-aldente --help

Usage: palette-aldente [options] <file>

CLI to manage color palettes

Arguments:
  file                          path to input yaml or json file

Options:
  -V, --version                 output the version number
  -O, --out <directory>         path to output directory (default: "./dist")
  -A, --autoname <boolean>      if true, the palette name will be generated from the colors contained (default: true)
  --no-autoname                 unnamed palettes will be have "Untitled <n>" as name
  -F, --formats <string>        comma separated list of formats to convert to
  -D, --defaultformat <string>  default color format outputted in your target file (default: "hex")
  -S, --svg <boolean>           export an overview SVG of the palettes (default: true)
  --no-svg                      do not export an overview SVG of the palettes
  -J, --js <boolean>            export a JS wrapper file with the palettes an a minimal API (default: true)
  --no-js                       do not export an JS file
  -H, --html <boolean>          export a HTML file that showcases the palettes (default: true)
  --no-html                     do not export an HTML file
  -I, --img <boolen>            export PNG images of the palettes (default: true)
  --no-img                      do not export PNG images of the palettes
  -h, --help                    display help for command
```

A collection of color palettes I want to reuse.
Feel free to clone this and use it to create your own palette library

## Build

1. Edit your palettes in [palettes.yml](/src/palettes.yml)
2. Install all things that are needed to build your palette. (`npm ci`)
3. Run `npm run build` (Check the console output for eventual error)
4. Enjoy your files in the `dist/` folder

## Use

To use this in your JS code import or include `dist/palettes.js`. It exposes the following props:
- `palettes` an array of objects containing `name` (string with the palette name) and `colors` (an array of hex values as strings)
- `get(paletteName)` will return an object of the palete with a given name
- `random()` returns a random palette
- `addPalettes(object)` merges in new palettes

## Used by
[York Town Hall Colors](https://github.com/studioyorktown/coloryorktownhall)

## Example PNG Export

![List of Palettes as PNG](/dist/palettes.png)

## Example SVG Export

![List of Palettes as SVG](/dist/palettes.svg)
