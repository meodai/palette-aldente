import AnyPalette from 'anypalette';
import {Blob} from 'buffer';

import {
  parse
} from 'culori';
import { fstat } from 'fs';

const formatsToExport = [
  'ADOBE_SWATCH_EXCHANGE_PALETTE',
  'ADOBE_COLOR_SWATCH_PALETTE',
];

const pal = 
	{
		name: "Gentle Sting",
		colors: [
			"#1b1b19",
			"#da704a",
			"#c8afbc",
			"#f6cab4"
		]
	};

const format = AnyPalette.formats.ADOBE_COLOR_SWATCH_PALETTE;

const palette = new AnyPalette.Palette();
palette.name = pal.name;
palette.numberOfColumns = pal.colors.length;
palette.colors = pal.colors.map(color => {
  const parsed = parse(color);
  console.log(parsed)
  const c = new AnyPalette.Color({
    red: parsed.r,
    green: parsed.g,
    blue: parsed.b,
  });
  if (c) {
    return c;
  } else {
    console.error('Invalid color', color);
    return false;
  }
});

const filecontent = AnyPalette.writePalette(palette, format);

const blob = new Blob([filecontent]);

// create file from blob
const file = new File([blob], 'test.aco', {type: 'text/plain'});
console.log(file);