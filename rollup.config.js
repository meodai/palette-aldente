import json from '@rollup/plugin-json';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/palettes.js',
    format: 'umd',
    name: 'colorPalettes',
  },
  plugins: [json()],
};