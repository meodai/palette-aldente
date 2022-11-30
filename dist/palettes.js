(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.colorPalettes = {}));
})(this, (function (exports) { 'use strict';
  
  const palettes = [{"colors":["#1b1b19","#803e23","#ac6633","#ea9e52","#f7eedf","#d7d3c8","#aacfc8"]},{"colors":["#1b1b19","#da704a","#c8afbc","#f6cab4"]},{"colors":["#ff0000","#ffffff","#202123"]},{"colors":["#eac328","#ce6d54","#354046"]},{"colors":["#b03b5f","#e1e6eb","#07080b"]},{"colors":["#e39e84","#73bede","#fdf8e7"]},{"colors":["#ffffff","#e17887","#90c6e6"]},{"colors":["#ffeeee","#202125","#ffdddd"],"name":"Voracious Blonde"},{"colors":["#ffd919","#262104","#fffbe6"],"name":"Diamond Passage"}]

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