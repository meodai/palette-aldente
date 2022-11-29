# palette-aldente
A collection of color palettes I want to reause.
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

![List of Palettes](/dist/palettes.svg)
