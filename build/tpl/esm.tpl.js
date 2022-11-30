/**palettes**/

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