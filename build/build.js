import yaml from 'js-yaml';
import fs from 'fs';
import {
  Chalk
} from 'chalk';

const customChalk = new Chalk({
  level: 3,
});

import {
  parse
} from 'culori';

const ymlSrc = fs.readFileSync('./src/palettes.yml', 'utf8');
let palettes;

try {
  palettes = yaml.load(ymlSrc);
} catch (e) {
  console.error(e);
}

function validatePaletteObj(obj) {
  if (!obj.hasOwnProperty('name') || !obj.hasOwnProperty('colors')) {
    console.error('Palette object is missing a name or colors property', obj);
    return false;
  } else {
    return true;
  }
}

palettes.forEach((palette, i) => {
  if (validatePaletteObj(palette)) {
    console.log('Title:', customChalk.bold(palette.name));
    console.log('Colors:');
    palette.colors = palette.colors.map(color => {
      const parsed = parse(color);
      if (parsed) {
        console.log(
          customChalk.hex(color).bold('██████▶'),
          color
        )
        return color;
      } else {
        console.error('Invalid color', color);
        return false;
      }
    });
    console.log('⎯'.repeat(40));
  }
});

fs.writeFileSync(
  './dist/palettes.json', 
  JSON.stringify(
    palettes,
    null,
    2
  ),
  'utf8'
);

fs.copyFile('./src/index.html', './dist/index.html', (err) => {
  if (err) throw err;
  console.log('./src/index.html was copied for some reason');
});

console.log('Done!, Exported palettes to "dist/palettes.json"');