(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.colorPalettes = {}));
})(this, (function (exports) { 'use strict';

  var palettes = [
  	{
  		name: "Twilight Chocolate",
  		colors: [
  			"#1b1b19",
  			"#803e23",
  			"#ac6633",
  			"#ea9e52",
  			"#f7eedf",
  			"#d7d3c8",
  			"#aacfc8"
  		]
  	},
  	{
  		name: "Gentle Sting",
  		colors: [
  			"#1b1b19",
  			"#da704a",
  			"#c8afbc",
  			"#f6cab4"
  		]
  	},
  	{
  		name: "Yemen",
  		colors: [
  			"#f00",
  			"#fff",
  			"#202123"
  		]
  	},
  	{
  		name: "German Hop",
  		colors: [
  			"#eac328",
  			"#ce6d54",
  			"#354046"
  		]
  	},
  	{
  		name: "Chaotic Eight Ball",
  		colors: [
  			"#b03b5f",
  			"#e1e6eb",
  			"#07080b"
  		]
  	},
  	{
  		name: "Shrimp Latte",
  		colors: [
  			"#e39e84",
  			"#73bede",
  			"#fdf8e7"
  		]
  	}
  ];

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
