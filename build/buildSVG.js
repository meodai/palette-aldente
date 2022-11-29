

import fs from 'fs';

const palettes = JSON.parse(fs.readFileSync('./dist/palettes.json', 'utf8'));
const items = palettes.length;
const w = 200;
const itemH = 10;
const padding = 5;
const inlineSpace = 2;
const fontSize = 6;
const h = ( fontSize + itemH + padding * 2 ) * items;


const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">
    <style>
      text {
        font-family: sans-serif;
        font-size: ${fontSize}px;
      }
    </style>
    ${palettes.map((c, i) => {
      const width = w/c.colors.length - inlineSpace;
      const top = fontSize + fontSize/1.5 + i * (itemH + fontSize + padding * 2);
      return `<text y="${top - fontSize + fontSize/1.4}" x="3">${c.name}</text>` + c.colors.map((hex, j) => {
        return `<rect width="${width}" height="${itemH}" y="${top}" x="${j * width + j * inlineSpace}" fill="${hex}" />`
      }).join('\n');
    }).join('\n')}
  </svg>
`;

fs.writeFileSync('./dist/palettes.svg', svg);