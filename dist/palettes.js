(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.colorPalettes = {}));
})(this, (function (exports) { 'use strict';
  
  const palettes = [{"name":"Twilight Chocolate","colors":["#1b1b19","#803e23","#ac6633","#ea9e52","#f7eedf","#d7d3c8","#aacfc8"]},{"name":"Gentle Sting","colors":["#1b1b19","#da704a","#c8afbc","#f6cab4"]},{"name":"Yemen","colors":["#ff0000","#ffffff","#202123"]},{"name":"German Hop","colors":["#eac328","#ce6d54","#354046"]},{"name":"Chaotic Eight Ball","colors":["#b03b5f","#e1e6eb","#07080b"]},{"name":"Shrimp Latte","colors":["#e39e84","#73bede","#fdf8e7"]},{"name":"Doctor Pond","colors":["#ffffff","#e17887","#90c6e6"]},{"colors":["#ffeeee","#202125","#ffdddd"],"name":"Voracious Blonde"},{"colors":["#ffd919","#262104","#fffbe6"],"name":"Diamond Passage"},{"name":"My Simple Palettes","palettes":[{"colors":["#ee726b","#ffc5c7","#fef9c6"],"name":"Piglet of Chilli"},{"colors":["#0a1966","#ffef0d","#fafafa"],"name":"20000 White"},{"colors":["#f9f9f9","#ff0000","#0000ff"],"name":"Blue Red"}]},{"palettes":[{"colors":["#ffffff","#202124","#ffdddd"],"name":"Noble Blonde"},{"colors":["#ffd919","#262104","#fffbe6"],"name":"Diamond Passage"},{"colors":["#ff4f19","#15084d","#5ce6e6"],"name":"Poseidon Ravenclaw"}],"name":"Diamond Ravenclaw"}]

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