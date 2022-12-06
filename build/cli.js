#!/usr/bin/env node
import {program} from 'commander';
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const JSESMTPL = fs.readFileSync(
    path.join(__dirname, 'tpl', 'esm.tpl.js'),
    'utf8',
);

const JSUMDTPL = fs.readFileSync(
    path.join(__dirname, 'tpl', 'umd.tpl.js'),
    'utf8',
);

let HTMLTPL = fs.readFileSync(
    path.join(__dirname, 'tpl', 'index.html'),
    'utf8',
);

import {
  possibleConverters,
  readFile,
  createPaletteArray,
} from './build.js';

import {buildSVG} from './buildSVG.js';

import {createOverview, createPalette} from './buildBitmap.js';

/**
 * @param {Array} palettes
 * @return {Array} Array of arrays of colors
 */
function flattenPalettes(palettes) {
  return palettes.reduce((acc, palette) => {
    if (palette.hasOwnProperty('palettes')) {
      return acc.concat(flattenPalettes(palette.palettes));
    }
    return acc.concat(palette);
  }, []);
}

/**
 * @param {string} value
 * @return {string} trimmed string
*/
function parsePossibleConverters(value) {
  if (possibleConverters.includes(value.trim())) {
    return value.trim();
  }
  throw new Error(
      `Invalid converter ${value} possible values are 
      ${possibleConverters.join(', ')}`,
  );
}

program
    .name('palette-aldente')
    .description('CLI to manage color palettes')
    .version('1.0.0');

program
    .argument(
        '<file>',
        'path to input yaml or json file',
    )
    .option(
        '-O, --out <directory>',
        'path to output directory',
        './dist',
    )
    .option(
        '-A, --autoname <boolean>',
        'if true, the palette name will be generated from the colors contained',
        true,
    )
    .option(
        '--no-autoname',
        'unnamed palettes will be have "Untitled <n>" as name',
    )
    .option(
        '-F, --formats <string>',
        'comma separated list of formats to convert to',
    )
    .option(
        '-D, --defaultformat <string>',
        'default color format outputted in your target file',
        'hex',
    )
    .option(
        '-S, --svg <boolean>',
        'export an overview SVG of the palettes',
        true,
    )
    .option(
        '--no-svg',
        'do not export an overview SVG of the palettes',
    )
    .option(
        '-J, --js <boolean>',
        'export a JS wrapper file with the palettes an a minimal API',
        true,
    )
    .option(
        '--no-js',
        'do not export an JS file',
    )
    .option(
        '-H, --html <boolean>',
        'export a HTML file that showcases the palettes',
        true,
    )
    .option(
        '--no-html',
        'do not export an HTML file',
    )
    .option(
        '-I, --img <boolen>',
        'export PNG images of the palettes',
        true,
    )
    .option(
        '--no-img',
        'do not export PNG images of the palettes',
    );

program
    .action((file, options) => {
      const defaultColorFormat = parsePossibleConverters(options.defaultformat);

      let additionalColorFormats = [];

      if (options.formats) {
        additionalColorFormats = options.formats.split(',').map(
            parsePossibleConverters,
        );
      }

      if (fs.existsSync(file)) {
        const inputPalette = readFile(file);
        const paletteArray = createPaletteArray(
            inputPalette,
            defaultColorFormat,
            additionalColorFormats,
            options.autoname,
        );
        const flatPalettesArray = flattenPalettes(paletteArray);

        if (!fs.existsSync(options.out)) {
          fs.mkdirSync(options.out, {recursive: true});
        }

        fs.writeFileSync(
            path.join(
                options.out,
                'palettes.json',
            ),
            JSON.stringify(
                paletteArray,
                null,
                2,
            ),
            'utf8',
        );

        if (options.svg) {
          fs.writeFileSync(
              path.join(options.out, 'palettes.svg'),
              buildSVG(
                  flatPalettesArray,
                  {
                    svgcss: fs.readFileSync(
                        path.join(__dirname, 'svg.css'),
                        'utf8',
                    ),
                  },
              ),
              'utf8',
          );

          console.log(`SVG exported palettes to "${
            path.join(
                options.out,
                'palettes.svg',
            )
          }"`);
        }

        if (options.img) {
          const palettesCanvases = [];

          flatPalettesArray.forEach((palette, index) => {
            const $canvas = createPalette(palette);

            // convert palette.name to a valid filename
            const paletteName = palette.name
                .replace(/[^a-z0-9]/gi, '_').toLowerCase();

            const filename = `palette-${index}-${paletteName}.png`;
            const filepath = path.join(options.out, 'img/', filename);

            if (!fs.existsSync(path.join(options.out, 'img/'))) {
              fs.mkdirSync(path.join(options.out, 'img/'), {recursive: true});
            }

            const buffer = $canvas.toBuffer('image/png');

            palettesCanvases.push($canvas)

            fs.writeFileSync(
                filepath,
                buffer,
            );
          });

          fs.writeFileSync(
              path.join(options.out, 'palettes.png'),
              createOverview(palettesCanvases).toBuffer('image/png'), 
              'utf8',
          );

          console.log(`PNG exported palettes to "${
            path.join(
                options.out,
                'palettes.png',
            )
          }" and individual palettes to "${
            path.join(options.out, 'img/')
          }"`);
        }

        if (options.js) {
          fs.writeFileSync(
              path.join(options.out, 'palettes.esm.js'),
              JSESMTPL.replace(
                  '/**palettes**/',
                  `const palettes = ${JSON.stringify(paletteArray)}`,
              ),
              'utf8',
          );

          fs.writeFileSync(
              path.join(options.out, 'palettes.js'),
              JSUMDTPL.replace(
                  '/**palettes**/',
                  `const palettes = ${JSON.stringify(paletteArray)}`,
              ),
              'utf8',
          );
        }

        if (options.html) {
          fs.writeFileSync(
              path.join(options.out, 'index.html'),
              HTMLTPL,
              'utf8',
          );
        }

        console.log(`Done!, Exported palettes to "${
          path.join(
              options.out,
              'palettes.json',
          )
        }"`);
      } else {
        console.error(`${file} not found`);
      }
    });

program.parse();
