const palettes = [{"colors":["#1b1b19","#803e23","#ac6633","#ea9e52","#f7eedf","#d7d3c8","#aacfc8"]},{"colors":["#1b1b19","#da704a","#c8afbc","#f6cab4"]},{"colors":["#ff0000","#ffffff","#202123"]},{"colors":["#eac328","#ce6d54","#354046"]},{"colors":["#b03b5f","#e1e6eb","#07080b"]},{"colors":["#e39e84","#73bede","#fdf8e7"]},{"colors":["#ffffff","#e17887","#90c6e6"]},{"colors":["#ffeeee","#202125","#ffdddd"],"name":"Voracious Blonde"},{"colors":["#ffd919","#262104","#fffbe6"],"name":"Diamond Passage"}]

let localPalettes = palettes;

const colorPalettes = {
  palettes: localPalettes,
  get: (nameOrIndex) => {
    if (typeof nameOrIndex === 'number') {
      return localPalettes[nameOrIndex];
    }
    return localPalettes.find(p => p.name === nameOrIndex);
  },
  random: (nbr) => {
    if (nbr && typeof nbr != 'number' || nbr > 1 || nbr < 0) {
      throw new Error('random() only accepts a number between 0 and 1');
    }

    return localPalettes[
      Math.floor(
        (nbr || Math.random()) * localPalettes.length
      )
    ];
  },
  addPalettes: (newPalettes) => {
    localPalettes = palettes.concat(newPalettes);
  }
};

export {colorPalettes};