(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.colorPalettes = {}));
})(this, (function (exports) { 'use strict';
  
  /**palettes**/

  let localPalettes = palettes;

  const colorPalettes = {
    palettes: localPalettes,
    get: (name) => {
      return localPalettes.find(p => p.name === name);
    },
    random: () => {
      return localPalettes[Math.floor(Math.random() * localPalettes.length)];
    },
    addPalettes: (newPalettes) => {
      localPalettes = palettes.concat(newPalettes);
    }
  };
  
  exports.colorPalettes = colorPalettes;
}));