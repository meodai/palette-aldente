#!/usr/bin/env node
import { program } from 'commander';
import fs from 'fs';
import path from 'path';

import {
  possibleConverters,
  readFile,
  createPaletteArray
} from './build.js';

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
    '-o, --out <directory>', 
    'path to output directory',
    './dist'
  )
  .option(
    '-f, --formats <string>',
    'comma separated list of formats to convert to'
  )
  .option(
    '-d, --defaultformat <string>', 
    'default color format outputted in your target file', 
    'hex'
  ).action((file, options, command) => {
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
      fs.writeFileSync(
        path.join(options.out, 'palettes.json'), 
        JSON.stringify(
          paletteArray,
          null,
          2
        ),
        'utf8'
      );
    } else {
      console.error(`${file} not found`);
    }
  });

program.parse();

//console.log(program.args[0].split(options.separator, limit));