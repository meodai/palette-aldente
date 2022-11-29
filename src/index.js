import palettes from '../dist/palettes.json';

let localPalettes = palettes;

const pals = {
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

export {
  pals
};