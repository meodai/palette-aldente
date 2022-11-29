import json from '@rollup/plugin-json';

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/palettes.js',
      format: 'umd',
      name: 'colorPalettes',
    },
    {
      file: 'dist/palettes.esm.js',
      format: 'esm',
    }
  ],
  plugins: [json()],
};