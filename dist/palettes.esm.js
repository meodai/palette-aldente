const palettes = [{"name":"Twilight Chocolate","colors":["#1b1b19","#803e23","#ac6633","#ea9e52","#f7eedf","#d7d3c8","#aacfc8"]},{"name":"Gentle Sting","colors":["#1b1b19","#da704a","#c8afbc","#f6cab4"]},{"name":"Yemen","colors":["#ff0000","#ffffff","#202123"]},{"name":"German Hop","colors":["#eac328","#ce6d54","#354046"]},{"name":"Chaotic Eight Ball","colors":["#b03b5f","#e1e6eb","#07080b"]},{"name":"Shrimp Latte","colors":["#e39e84","#73bede","#fdf8e7"]},{"name":"Doctor Pond","colors":["#ffffff","#e17887","#90c6e6"]}]

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