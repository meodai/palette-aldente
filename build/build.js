import yaml from 'js-yaml';
import fs, { read } from 'fs';
import path from 'path';

import {
  Chalk
} from 'chalk';

const customChalk = new Chalk({
  level: 3,
});

import {
  parse,
  converter,
  formatHex,
} from 'culori';

const possibleConverters = [
  'lab', 'lch', 'rgb', 'hsl', 'hsv', 'hcl', 'hsi', 'hwb', 'lchuv', 'hsluv', 'luv', 'jch', 'jab', 'dlch', 'oklch', 'oklab', 'okhsl', 'okhsv', 'dlab', 'dlch', 'yiq', 'lrgb', 'hex',
];

//console.log( converter('lrgb')('blue') );

function validatePaletteObj(obj) {
  if (!obj.hasOwnProperty('name') || !obj.hasOwnProperty('colors')) {
    console.error('Palette object is missing a name or colors property', obj);
    return false;
  } else {
    return true;
  }
}

function readFile(pathToFile) {
  const fileContents = fs.readFileSync(pathToFile, 'utf8');

  if (path.extname(pathToFile) === '.yml') {
    return yaml.load(fileContents);
  } else if (path.extname(pathToFile) === '.json') {
    return JSON.parse(fileContents);
  }
}

function createPaletteArray(
  paletteArrFromFile,
  defaultOutputFormat = 'hex',
  additionalOutputFormats = [],
) {
  return paletteArrFromFile.map(palette => {
    if (!validatePaletteObj(palette)) {
      return;
    }

    console.log('Title:', customChalk.bold(palette.name));
    console.log('Colors:');

    const defaultColors = [];
    const colorInOtherFormats = {};

    additionalOutputFormats.forEach(format => {
      colorInOtherFormats[format] = [];
    });

    palette.colors.forEach(color => {
      const parsedColor = parse(color);

      if (parsedColor) {
        const colorAsHex = formatHex(color);
        const defaultExportColor = defaultOutputFormat === 'hex' ? formatHex(color) : converter(defaultOutputFormat)(color); 
        
        if (defaultOutputFormat !== 'hex') {
          delete defaultExportColor['mode']
        }

        console.log(
          customChalk.hex(colorAsHex).bold('██████▶'),
          defaultExportColor,
        );

        defaultColors.push(defaultExportColor);

        if (additionalOutputFormats.length) {
          additionalOutputFormats.forEach(format => {
            const colorInOtherFormat = format === 'hex' ? formatHex(color) : converter(format)(color);
            delete colorInOtherFormat['mode'];
            colorInOtherFormats[format].push(colorInOtherFormat);
          });
        }
      } else {
        console.error('Invalid color', color);
        return false;
      }
    });

    palette.colors = defaultColors;
    
    if (additionalOutputFormats) {
      additionalOutputFormats.forEach(format => {
        palette[`colors-${format}`] = colorInOtherFormats[format];
      });
    }

    console.log('⎯'.repeat(40));
    
    return palette;
  });
}

/*
fs.copyFile('./src/index.html', './dist/index.html', (err) => {
  if (err) throw err;
  console.log('./src/index.html was copied');
});*/

export {
  possibleConverters,
  readFile,
  createPaletteArray
};