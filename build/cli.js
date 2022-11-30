#!/usr/bin/env node
import { program } from 'commander';
import fs from 'fs';
import path from 'path';


import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


let JSESMTPL = fs.readFileSync(
  path.join(__dirname, 'tpl', 'esm.tpl.js'),
  'utf8'
);

let JSUMDTPL = fs.readFileSync(
  path.join(__dirname, 'tpl', 'umd.tpl.js'), 
  'utf8'
);

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
  )
  .option(
    '-J, --js', 
    'export a JS wrapper file with the palettes an a minimal API', 
    true
  )
  .option(
    '--no-js', 
    'do not export an JS file'
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
          buildSVG(paletteArray),
          'utf8'
        );

        console.log(`SVG exported palettes to "${
          path.join(
            options.out, 
            'palettes.svg'
          )
        }"`);
      }

      if (options.svg) {
        fs.writeFileSync(
          path.join(options.out, 'palettes.esm.js'),
          JSESMTPL.replace('/**palettes**/', `const palettes = ${JSON.stringify(paletteArray)}`),
          'utf8'
        );

        fs.writeFileSync(
          path.join(options.out, 'palettes.js'),
          JSUMDTPL.replace('/**palettes**/', `const palettes = ${JSON.stringify(paletteArray)}`),
          'utf8'
        );
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