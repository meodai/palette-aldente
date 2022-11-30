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

import colorNameLists from 'color-name-lists';
import colors from 'color-name-list/dist/colornames.esm.mjs';
import colorsBestOf from 'color-name-list/dist/colornames.bestof.esm.mjs';
import {FindColors} from 'color-name-api/src/findColors.js';
import {getPaletteTitle} from 'color-name-api/src/generatePaletteName.js';

/*
findColors.getNamesForValues(
  urlColorList, uniqueMode, listKey
)*/

const colorsLists = {
  default: colors,
  colors: colors,
  bestOf: colorsBestOf,
};

Object.assign(colorsLists, colorNameLists.lists);

const avalibleColorNameLists = Object.keys(colorsLists);
const findColors = new FindColors(colorsLists);

const possibleConverters = [
  'lab', 'lch', 'rgb', 'hsl', 'hsv', 'hcl', 'hsi', 'hwb', 'lchuv', 'hsluv', 'luv', 'jch', 'jab', 'dlch', 'oklch', 'oklab', 'okhsl', 'okhsv', 'dlab', 'dlch', 'yiq', 'lrgb', 'hex', 'name',
];

//console.log( converter('lrgb')('blue') );

function validatePaletteObjKeys(obj) {
  if (
    !obj.hasOwnProperty('colors') && !obj.hasOwnProperty('palettes')
  ) {
    console.error('Palette object is missing a palettes or colors property', obj);
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

function parseColors(
  colorsArr, 
  defaultOutputFormat = 'hex', 
  additionalOutputFormats = [],
  nameList = 'bestOf'
) {
  const parsedColors = colorsArr.map(color => {
    const colorObj = {};

    const parsedColor = parse(color);

    if (parsedColor) {
      colorObj.hex = formatHex(color);
      colorObj.value = defaultOutputFormat === 'hex' ? formatHex(color) : converter(defaultOutputFormat)(color);

      additionalOutputFormats.forEach(format => {
        colorObj[format] = [];
      });

      if (defaultOutputFormat !== 'hex') {
        delete colorObj.default['mode'];
      }

      if (additionalOutputFormats.length) {
        additionalOutputFormats.forEach(format => {
          let colorInOtherFormat;

          if (format === 'hex') {
            colorInOtherFormat = colorObj.hex;
          } 
          
          if (format !== 'name') {
            colorInOtherFormat = converter(format)(color);
            delete colorInOtherFormat['mode'];
          }

          colorObj[format] = colorInOtherFormat;
        });
      }

      return colorObj;
    } else {
      console.error('Invalid color value', color);
      return false;
    }
  });

  const namesArr = findColors.getNamesForValues(
    parsedColors.map(c => c.hex.slice(1)), true, nameList
  ).map(colorNameObj => colorNameObj.name);

  namesArr.forEach((name, i) => {
    parsedColors[i].name = name;
  });

  return parsedColors;
};



function createPaletteArray(
  paletteArrFromFile,
  defaultOutputFormat = 'hex',
  additionalOutputFormats = [],
  autoname = true,
) {
  let untitledCount = -1;
  
  return paletteArrFromFile.map(palette => {
    if (!validatePaletteObjKeys(palette)) {
      return;
    }

    palette.colors = parseColors(
      palette.colors, 
      defaultOutputFormat, 
      additionalOutputFormats,
      'bestOf'
    );

    if (autoname && !palette.hasOwnProperty('name')) {
      palette.name = getPaletteTitle(palette.colors.map(c => c.name));
    } else if (!palette.hasOwnProperty('name')) {
      palette.name = `Untitled ${untitledCount += 1}`;
    }

    console.log('Title:', customChalk.bold(palette.name));
    console.log('Colors:');

    palette.colors = palette.colors.map(color => {
      console.log(
        customChalk.hex(color.hex).bold('██████▶'),
        color.value,
        customChalk.bold(color.name),
      );

      if (!additionalOutputFormats.includes('hex')) {
        delete color.hex;
      }

      if (!additionalOutputFormats.includes('name')) {
        delete color.name;
      }

      return Object.keys(color).length > 1 ? color : color.value;
    });
    
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