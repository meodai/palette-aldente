import {createCanvas} from 'canvas';

const defaultPaletteOptions = {
  width: 500,
  colorSwatchHeight: 35,
  colorSwatchGap: 2,
  padding: 5,
  fontSize: 15,
  fontGutter: 7,
  fontFamily: '"sans-serif"',
  fontWeight: 'bold',
  backgroundColor: 'transparent',
  textColor: '#202124',
  strokeWidth: 0,
  strokeColor: '#202124',
};

/**
 * @param {Array} palette Array of color palette objects with name and colors
 * @param {Object} options Options to extend the default options from
 * @return {Canvas} canvas canvas element
*/
function createPalette(palette, options) {
  const opt = Object.assign(
      {}, defaultPaletteOptions, options,
  );

  const w = opt.width;
  const h = opt.padding * 2 + opt.fontSize +
            opt.fontGutter + opt.colorSwatchHeight;

  const $can = createCanvas(w, h);
  const ctx = $can.getContext('2d');

  $can.width = w;
  $can.height = h;

  ctx.fillStyle = opt.backgroundColor;
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = opt.strokeColor;


  ctx.fillStyle = opt.textColor;

  if (opt.fontSize) {
    ctx.font = `${opt.fontWeight} ${opt.fontSize}px ${opt.fontFamily}`;
    ctx.fillText(palette.name, opt.padding, opt.padding + opt.fontSize);
  }

  const totalColors = palette.colors.length;
  const colorWidth = (w - opt.padding * 2) / totalColors - opt.colorSwatchGap;

  palette.colors.forEach((c, i) => {
    const relI = i/totalColors;
    const top = opt.fontSize + opt.fontGutter + opt.padding;
    const left = opt.padding + (i * (colorWidth + opt.colorSwatchGap));
    ctx.fillStyle = typeof c === 'object' ? c.value : c;
    ctx.lineWidth = opt.strokeWidth;

    ctx.beginPath();
    ctx.rect(
        left,
        top,
        colorWidth,
        opt.colorSwatchHeight,
    );
    ctx.fill();
    if (opt.strokeWidth && opt.strokeColor) {
      ctx.stroke();
    }
    ctx.closePath();
  });


  return $can;
}

/**
 * @param {Array} arrayOfCanvases Array of palette objects with name and colors
 * @return {Canvas} canvas canvas element
 */
function createOverview(arrayOfCanvases) {
  const height = arrayOfCanvases.reduce((r, $can) => r + $can.height, 0);

  const w = arrayOfCanvases.reduce((r, $can) => Math.max($can.width, r), 0);
  const h = height;

  const $can = createCanvas(w, h);
  const ctx = $can.getContext('2d');

  let top = 0;
  arrayOfCanvases.forEach(($can) => {
    ctx.drawImage($can, 0, top);

    top += $can.height;
  });

  return $can;
}

export {createOverview, createPalette};
