import AnyPalette from 'anypalette';
import {
  converter,
} from 'culori';

const rgb = converter('rgb');

const possiblePaletteFormats = Object.keys(AnyPalette.formats);

export const paletteFormats = AnyPalette.formats;

/**
 *
 * @param {Array} palette Array of colors
 * @param {String} paletteFormatKey Format to export the palette to
 * @return {file} filecontents of the palette
 */
export function createPaletteFile(
    palette,
    paletteFormatKey = 'ADOBE_SWATCH_EXCHANGE_PALETTE',
) {
  if (possiblePaletteFormats.indexOf(paletteFormatKey) === -1) {
    throw new Error(`Invalid palette format: ${paletteFormatKey}`);
  }
  const format = AnyPalette.formats[paletteFormatKey];
  const pal = new AnyPalette.Palette();

  pal.name = palette.hasOwnProperty('name') ? palette.name : 'Untitled Palette';
  palette.colors.forEach((color) => {
    let c = color;
    if (typeof color === 'string') {
      c = {value: color};
    }
    const rgbValue = rgb(c.value);
    const rgbObject = {
      red: rgbValue.r,
      green: rgbValue.g,
      blue: rgbValue.b,
    };
    const col = new AnyPalette.Color(rgbObject);
    if (c.hasOwnProperty('name')) {
      col.name = c.name;
    }

    pal.push(col);
  });

  return AnyPalette.writePalette(pal, format);
};
