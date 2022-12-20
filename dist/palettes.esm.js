const palettes = [{"name":"Twilight Chocolate","colors":["#1b1b19","#803e23","#ac6633","#ea9e52","#f7eedf","#d7d3c8","#aacfc8"]},{"name":"Gentle Sting","colors":["#1b1b19","#da704a","#c8afbc","#f6cab4"]},{"name":"Lobster Café","colors":["#312512","#cd2d10","#d07e40","#ce9464","#d6a786","#e5c9b5","#f7ebda"]},{"colors":["#f2ebdf","#353130","#2f72a6","#4e90c0","#6ca6ce","#80b994","#55ab8c","#f0b44c","#dd8c40","#e099a8","#d76f76","#c35448","#947b98","#786488"],"name":"Acapulco Pomegranate"},{"colors":["#29181e","#81695d","#ce7f50","#ebe1e2","#d74f32","#3b2a54"],"name":"Warrior Pie"},{"colors":["#f8ffad","#ffcf6e","#f49854","#c7aba1","#ecdfe3","#b4a9ec","#977cc7","#292222"],"name":"Banana Tulip"},{"colors":["#090909","#f8f8f8","#71ee6b","#e541c7"],"name":"Herbivore Pink"},{"colors":["#1e1b22","#f3aebd","#fdf4da","#ffffff","#abfcf8","#b9fdd6"],"name":"Ibis Mintastic"},{"colors":["#0f1910","#615829","#af8e4f","#e39e90","#edc5bb","#dbf5dc"],"name":"Reptile of Mint"},{"colors":["#36343f","#3e4c69","#726382","#c97481","#ec9699","#dfc3c7"],"name":"Nymph's Love"},{"colors":["#f1e9d6","#0f1d30","#284462","#82617c","#c47080","#bc5b34","#d4a44f","#395d54"],"name":"Fusilli Darkness"},{"author":"ippsketch","colors":["#ebe7e0","#262626","#bc594e","#bca357","#516b9e"],"name":"Tandoori Desert"},{"author":"ippsketch","colors":["#ebe7e0","#262626","#bc594e","#bf7e4f","#bca357","#5a844d","#467991","#516b9e","#656198"],"name":"Nero Desert"},{"name":"Brutal Tomato","colors":["#fe6666","#f6f6f6","#202125"]},{"name":"foundcolor.co","palettes":[{"name":"minimalism050-2","colors":["#bfa350","#abbbbb","#ce453c"]},{"name":"peet0711","colors":["#a5a5a5","#bbd4db","#f6c14f"]},{"name":"klausmicke","colors":["#aea57c","#dd7969","#9ea1b2"]},{"name":"nevaduh","colors":["#e3c7bc","#e85a4e","#0a4737"]}]}]

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

export {colorPalettes};