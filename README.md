# Palette Aldente 🍝

Color palette parser that helps maintaining and publishing your favourite color palettes:

- Makes sure your `yml` or `json` is actually valid
- Exports it to JSON
- Provides a handy JS wrapper that works everyhere. (Node, Browser, Codepen etc..)
- Exports a static SVG of all the palettes
- Provides a HTML templete with all the palletes. (Ideal for github pages)
- Coverts almost any color format to any other.
- Possibility to additionally convert to different color formats: lab, lch, oklab, hsl, etc...

## Quickstart
  
```bash
npx palette-aldente ./src/palettes.yml --formats name,rgb,hsl
```

## Manual

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
  -F, --formats <string>        comma separated list of formats to convert to
  -D, --defaultformat <string>  default color format outputted in your target file (default: "hex")
  -S, --svg                     export an overview SVG of the palettes (default: true)
  --no-svg                      do not export an overview SVG of the palettes
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

## Example SVG Export

![List of Palettes](/dist/palettes.svg)
