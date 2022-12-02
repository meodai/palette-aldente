(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.colorPalettes = {}));
})(this, (function (exports) { 'use strict';
  const palettes = [{"name":"Twilight Chocolate","colors":["#1b1b19","#803e23","#ac6633","#ea9e52","#f7eedf","#d7d3c8","#aacfc8"]},{"name":"Gentle Sting","colors":["#1b1b19","#da704a","#c8afbc","#f6cab4"]},{"name":"Lobster Café","colors":["#312512","#cd2d10","#d07e40","#ce9464","#d6a786","#e5c9b5","#f7ebda"]}]

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