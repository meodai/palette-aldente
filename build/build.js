import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

import {
  Chalk,
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

const colorsLists = {
  default: colors,
  bestOf: colorsBestOf,
};

Object.assign(colorsLists, colorNameLists.lists);

const avalibleColorNameLists = Object.keys(colorsLists);
const findColors = new FindColors(colorsLists);

const possibleConverters = [
  'lab', 'lch', 'rgb', 'hsl', 'hsv', 'hcl', 'hsi', 'hwb', 'lchuv', 'hsluv',
  'luv', 'jch', 'jab', 'dlch', 'oklch', 'oklab', 'okhsl', 'okhsv', 'dlab',
  'dlch', 'yiq', 'lrgb', 'hex', 'name',
];

/**
 * @param {array|object} item
 * @return {boolean|item} valid item or false
 */
function validatePaletteItem(item) {
  if (!item) {
    return false;
  }

  if (Array.isArray(item) && item.length) {
    return true;
  }

  if (
    typeof item === 'object'
  ) {
    if ( !item.hasOwnProperty('colors') && !item.hasOwnProperty('palettes') ) {
      console.error(
          'Palette object is missing a palettes or colors property',
          item,
      );
      return false;
    } else if (item.hasOwnProperty('colors') && !Array.isArray(item.colors)) {
      console.error('Palette object\'s colors property is not an array', item);
      return false;
    } else {
      return item;
    }
  }

  console.error('Palette object is not an array or object', item);
  return false;
}

/**
 * @param {string} pathToFile to read
 * @return {object} parsed file
 */
function readFile(pathToFile) {
  const fileContents = fs.readFileSync(pathToFile, 'utf8');

  if (path.extname(pathToFile) === '.yml') {
    return yaml.load(fileContents);
  } else if (path.extname(pathToFile) === '.json') {
    return JSON.parse(fileContents);
  }
}

/**
 * @param {Array} colorsArr Array of colors
 * @param {String} defaultOutputFormat Main output format
 * @param {Array} additionalOutputFormats Other formats besides default
 * @param {String} nameList Key of colorNameLists to use for naming
 * @param {boolean} ignoreInitialColorProps Whether to ignore initial properties
 * @return {Array} Array of parsed colors
 */
function parseColors(
    colorsArr,
    defaultOutputFormat = 'hex',
    additionalOutputFormats = [],
    nameList = 'bestOf',
    ignoreInitialColorProps = false,
) {
  const parsedColors = colorsArr.map((color) => {
    const colorObj = {};

    // if color is an object, try to find a color value and a possible name
    if (!Array.isArray(color) && typeof color === 'object') {
      const colorKeys = Object.keys(color);

      const colorKey = colorKeys.find(
          (key) => {
            const lowerKey = key.toLowerCase();

            return lowerKey === 'value' ||
            lowerKey === 'color' ||
            lowerKey === 'hex' ||
            lowerKey === 'rgb' ||
            lowerKey === 'hsl';
          },
      );

      const nameKey = colorKeys.find(
          (key) => {
            const lowerKey = key.toLowerCase();
            return lowerKey === 'name' ||
                   lowerKey === 'title';
          },
      );

      if (!colorKey) {
        console.error('Invalid color object', color);
        return false;
      }

      // if the color was an object, preserve all the other properties
      if (!ignoreInitialColorProps) {
        Object.assign(colorObj, color);
      }

      colorObj.name = color[nameKey];
      color = color[colorKey];
    }

    const parsedColor = parse(color);

    if (parsedColor) { // parse returns undefined if the color is invalid
      colorObj.hex = formatHex(color);
      colorObj.value = defaultOutputFormat === 'hex' ?
      formatHex(color) : converter(defaultOutputFormat)(color);

      additionalOutputFormats.forEach((format) => {
        colorObj[format] = [];
      });

      if (defaultOutputFormat !== 'hex') {
        delete colorObj.default.mode;
      }

      if (additionalOutputFormats.length) {
        additionalOutputFormats.forEach((format) => {
          let colorInOtherFormat;

          if (format === 'hex') {
            colorInOtherFormat = colorObj.hex;
          }

          if (format !== 'name') {
            colorInOtherFormat = format === 'hex' ?
              formatHex(color) :
              converter(format)(color);
            delete colorInOtherFormat.mode;
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
      parsedColors.map((c) => c.hex.slice(1)), true, nameList,
  ).map((colorNameObj) => colorNameObj.name);

  namesArr.forEach((name, i) => {
    parsedColors[i].name = parsedColors[i].hasOwnProperty('name') &&
                           parsedColors[i].name ?
                           parsedColors[i].name : name;
  });

  return parsedColors;
};

/**
 * @param {Array|Object} paletteArrFromFile Parse a palette from a file
 * @param {String} defaultOutputFormat Default output format
 * @param {Array} additionalOutputFormats Array of additional output formats
 * @param {Boolean} autoname Determine if palettes should be autonamed
 * @param {String} nameList List to use for autonaming
 * @param {boolean} ignoreInitialColorProps Whether to ignore initial properties
 * @return {Array} Array of parsed palettes
 */
function createPaletteArray(
    paletteArrFromFile,
    defaultOutputFormat = 'hex',
    additionalOutputFormats = [],
    autoname = true,
    nameList = 'bestOf',
    ignoreInitialColorProps = false,
) {
  let untitledCount = -1;

  return paletteArrFromFile.map((palette) => {
    if (!validatePaletteItem(palette)) {
      return;
    }

    let paletteObj = {};

    if (!Array.isArray(palette)) {
      paletteObj = Object.assign(paletteObj, palette);
    } else if (palette.length && !Array.isArray(palette[0])) {
      paletteObj.colors = palette;
    } else {
      paletteObj.palettes = palette;
    }

    if (paletteObj.hasOwnProperty('colors')) {
      paletteObj.colors = parseColors(
          Array.isArray(palette) ? palette : palette.colors,
          defaultOutputFormat,
          additionalOutputFormats,
          nameList,
          ignoreInitialColorProps,
      );
    }

    if (paletteObj.hasOwnProperty('palettes')) {
      paletteObj.palettes = createPaletteArray(
          paletteObj.palettes,
          defaultOutputFormat,
          additionalOutputFormats,
          autoname,
          nameList,
          ignoreInitialColorProps,
      );
    }

    if (autoname && !paletteObj.hasOwnProperty('name')) {
      if (paletteObj.hasOwnProperty('colors')) {
        paletteObj.name = getPaletteTitle(paletteObj.colors.map((c) => c.name));
      } else if (paletteObj.hasOwnProperty('palettes')) {
        paletteObj.name = getPaletteTitle(
            paletteObj.palettes.map((p) => p.name),
        );
      }
    } else if (!paletteObj.hasOwnProperty('name')) {
      paletteObj.name = `Untitled ${untitledCount += 1}`;
    }

    if (paletteObj.hasOwnProperty('colors')) {
      console.log('Title:', customChalk.bold(paletteObj.name));
      console.log('Colors:');

      paletteObj.colors = paletteObj.colors.map((color) => {
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
    }

    return paletteObj;
  });
}

export {
  possibleConverters,
  readFile,
  createPaletteArray,
  avalibleColorNameLists,
};
