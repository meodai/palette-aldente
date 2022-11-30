const defaultOptions = {
  width: 200,
  colorSampleHeight: 10,
  padding: 5,
  inlineSpace: 2,
  fontSize: 6,
};

export function buildSVG (
  paletteArray, 
  options = {}
) {
  options = Object.assign(
    {}, defaultOptions, options
  );

  const { 
    width, 
    colorSampleHeight, 
    padding, 
    inlineSpace, 
    fontSize 
  } = options;

  const items = paletteArray.length;
  const height = ( fontSize + colorSampleHeight + padding * 2 ) * items;

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">
      <style>
        text {
          font-family: sans-serif;
          font-size: ${fontSize}px;
        }
      </style>
      ${paletteArray.map((c, i) => {
        const itemWidth = width/c.colors.length - inlineSpace;
        const top = fontSize + fontSize/1.5 + i * (colorSampleHeight + fontSize + padding * 2);
        return `<text y="${top - fontSize + fontSize/1.4}" x="3">${c.name}</text>` + c.colors.map((color, j) => {
          let value = color;
          
          if (typeof value === 'object') {
            value = value.hasOwnProperty('hex') ? value.hex : value.value;
          }

          return `<rect width="${itemWidth}" height="${colorSampleHeight}" y="${top}" x="${j * itemWidth + j * inlineSpace}" fill="${value}" />`
        }).join('\n');
      }).join('\n')}
    </svg>
  `;
};
