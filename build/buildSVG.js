const defaultOptions = {
  width: 200,
  colorSampleHeight: 10,
  padding: 5,
  inlineSpace: 2,
  fontSize: 6,
  svgcss: '',
};

/**
 * @param {String} title
 * @param {Array} colors
 * @param {Number} top
 * @param {Object} options
 * @return {String} SVG string
 */
function colorRow(title, colors, top, options) {
  const {
    colorSampleHeight,
    width,
    inlineSpace,
    fontSize,
  } = options;

  const itemWidth = width/colors.length - inlineSpace;

  return `<text y="${top - fontSize * .5}" x="3">${title}</text>` +
  colors.map((color, j) => {
    let value = color;

    if (typeof value === 'object') {
      value = value.hasOwnProperty('hex') ? value.hex : value.value;
    }

    return `<rect width="${itemWidth}" height="${colorSampleHeight}"` +
      ` y="${top}" x="${j * itemWidth + j * inlineSpace}" fill="${value}" />`;
  }).join('\n');
}

/**
 * @param {Array} paletteArray
 * @param {Object} options
 * @return {String} SVG xml string
 */
export function buildSVG(
    paletteArray,
    options = {},
) {
  options = Object.assign(
      {}, defaultOptions, options,
  );

  const {
    width,
    colorSampleHeight,
    padding,
    fontSize,
    svgcss,
  } = options;

  const items = paletteArray.length;
  const height = ( fontSize + colorSampleHeight + padding * 2 ) * items;

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">
      <style>
        ${svgcss}
        text {
          font-size: ${fontSize}px;
        }
      </style>
      ${paletteArray.map((c, i) => {
    const top = fontSize + fontSize/1.5 + i *
                (colorSampleHeight + fontSize + padding * 2);
    if (c.hasOwnProperty('colors')) {
      return colorRow(
          c.name,
          c.colors,
          top,
          options,
      );
    }
  }).join('\n')}
    </svg>
  `;
};
