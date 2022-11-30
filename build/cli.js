#!/usr/bin/env node
import { program } from 'commander';
import fs from 'fs';
import path from 'path';

/*
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
*/

import {
  possibleConverters,
  readFile,
  createPaletteArray
} from './build.js';

import { buildSVG } from './buildSVG.js';

function parsePossibleConverters (value) {
  if (possibleConverters.includes(value)) {
    return value;
  }
  throw new Error(`Invalid converter ${value} possible values are ${possibleConverters.join(', ')}`);
}

program
  .name('palette-aldente')
  .description('CLI to manage color palettes')
  .version('1.0.0');

program
  .argument(
    '<file>', 
    'path to input yaml or json file'
  )
  .option(
    '-O, --out <directory>', 
    'path to output directory',
    './dist'
  )
  .option(
    '-F, --formats <string>',
    'comma separated list of formats to convert to'
  )
  .option(
    '-D, --defaultformat <string>', 
    'default color format outputted in your target file', 
    'hex'
  )
  .option(
    '-S, --svg', 
    'export an overview SVG of the palettes', 
    true
  )
  .option(
    '--no-svg', 
    'do not export an overview SVG of the palettes'
  );

program
  .action((file, options) => {
    const defaultColorFormat = parsePossibleConverters(options.defaultformat);
    
    let additionalColorFormats = [];

    if (options.formats) {
      additionalColorFormats = options.formats.split(',').map(parsePossibleConverters);
    }

    if (fs.existsSync(file)) {
      const inputPalette = readFile(file);
      const paletteArray = createPaletteArray(
        inputPalette, 
        defaultColorFormat, 
        additionalColorFormats
      );
      
      if (!fs.existsSync(options.out)){
        fs.mkdirSync(options.out, { recursive: true });
      }

      fs.writeFileSync(
        path.join(
          options.out, 
          'palettes.json'
        ), 
        JSON.stringify(
          paletteArray,
          null,
          2
        ),
        'utf8'
      );
      
      if (options.svg) {
        fs.writeFileSync(
          path.join(options.out, 'palettes.svg'),
          buildSVG(paletteArray)
        );

        console.log(`SVG exported palettes to "${
          path.join(
            options.out, 
            'palettes.svg'
          )
        }"`);
      }

      console.log(`Done!, Exported palettes to "${
        path.join(
          options.out, 
          'palettes.json'
        )
      }"`);

    } else {
      console.error(`${file} not found`);
    }
  });

program.parse();

//console.log(program.args[0].split(options.separator, limit));