(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.colorPalettes = {}));
})(this, (function (exports) { 'use strict';
  const palettes = [{"name":"Twilight Chocolate","colors":["#1b1b19","#803e23","#ac6633","#ea9e52","#f7eedf","#d7d3c8","#aacfc8"]},{"name":"Gentle Sting","colors":["#1b1b19","#da704a","#c8afbc","#f6cab4"]},{"name":"Lobster Café","colors":["#312512","#cd2d10","#d07e40","#ce9464","#d6a786","#e5c9b5","#f7ebda"]},{"colors":["#f2ebdf","#353130","#2f72a6","#4e90c0","#6ca6ce","#80b994","#55ab8c","#f0b44c","#dd8c40","#e099a8","#d76f76","#c35448","#947b98","#786488"],"name":"Acapulco Pomegranate"},{"colors":["#29181e","#81695d","#ce7f50","#ebe1e2","#d74f32","#3b2a54"],"name":"Warrior Pie"},{"colors":["#f8ffad","#ffcf6e","#f49854","#c7aba1","#ecdfe3","#b4a9ec","#977cc7","#292222"],"name":"Banana Tulip"},{"colors":["#090909","#f8f8f8","#71ee6b","#e541c7"],"name":"Herbivore Pink"},{"colors":["#1e1b22","#f3aebd","#fdf4da","#ffffff","#abfcf8","#b9fdd6"],"name":"Ibis Mintastic"},{"colors":["#ffff00","#00ffff"],"name":"Yellow Aqua"}]

  /**
   * @param {Array} palettes
   * @return {Array} Array of arrays of colors
   */
  function flattenPalettes(palettes) {
    return palettes.reduce((acc, palette) => {
      if (palette.hasOwnProperty('palettes')) {
        return acc.concat(flattenPalettes(palette.palettes));
      }
      return acc.concat(palette);
    }, []);
  }

  let localPalettes = palettes;
  let localPalettesFlat = flattenPalettes(localPalettes);

  const colorPalettes = {
    palettes: localPalettes,
    palettesFlat: localPalettesFlat,
    get: (nameOrIndex) => {
      if (typeof nameOrIndex === 'number') {
        return localPalettesFlat[nameOrIndex];
      }
      return localPalettesFlat.find((p) => p.name === nameOrIndex);
    },
    random: (nbr) => {
      if (nbr && typeof nbr != 'number' || nbr > 1 || nbr < 0) {
        throw new Error('random() only accepts a number between 0 and 1');
      }

      return localPalettesFlat[
          Math.floor(
              (nbr || Math.random()) * localPalettesFlat.length,
          )
      ];
    },
    addPalettes: (newPalettes) => {
      localPalettes = palettes.concat(newPalettes);
      localPalettesFlat = flattenPalettes(localPalettes);
    },
  };

  
  exports.colorPalettes = colorPalettes;
}));