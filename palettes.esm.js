const palettes = [{"name":"Twilight Chocolate","colors":["#1b1b19","#803e23","#ac6633","#ea9e52","#f7eedf","#d7d3c8","#aacfc8"]},{"name":"Gentle Sting","colors":["#1b1b19","#da704a","#c8afbc","#f6cab4"]},{"name":"Lobster Café","colors":["#312512","#cd2d10","#d07e40","#ce9464","#d6a786","#e5c9b5","#f7ebda"]},{"colors":["#f2ebdf","#353130","#2f72a6","#4e90c0","#6ca6ce","#80b994","#55ab8c","#f0b44c","#dd8c40","#e099a8","#d76f76","#c35448","#947b98","#786488"],"name":"Acapulco Pomegranate"},{"colors":["#29181e","#81695d","#ce7f50","#ebe1e2","#d74f32","#3b2a54"],"name":"White Tomato"},{"colors":["#f8ffad","#ffcf6e","#f49854","#c7aba1","#ecdfe3","#b4a9ec","#977cc7","#292222"],"name":"Banana Tulip"},{"colors":["#090909","#f8f8f8","#71ee6b","#e541c7"],"name":"Herbivore Pink"},{"colors":["#1e1b22","#f3aebd","#fdf4da","#ffffff","#abfcf8","#b9fdd6"],"name":"Ibis Mintastic"},{"colors":["#0f1910","#615829","#af8e4f","#e39e90","#edc5bb","#dbf5dc"],"name":"Reptile Flip"},{"colors":["#36343f","#3e4c69","#726382","#c97481","#ec9699","#dfc3c7"],"name":"Nymph's Love"},{"colors":["#f1e9d6","#0f1d30","#284462","#82617c","#c47080","#bc5b34","#d4a44f","#395d54"],"name":"Fusilli Darkness"},{"author":"ippsketch","colors":["#ebe7e0","#262626","#bc594e","#bca357","#516b9e"],"name":"Tandoori Desert"},{"author":"ippsketch","colors":["#ebe7e0","#262626","#bc594e","#bf7e4f","#bca357","#5a844d","#467991","#516b9e","#656198"],"name":"Nero Desert"},{"name":"Brutal Tomato","colors":["#fe6666","#f6f6f6","#202125"]},{"colors":["#ede8e1","#a37673","#eea22c","#2c763d","#1c3445"],"name":"Puffy Cheddar"},{"name":"Y.M.C.K","colors":["#eee9e5","#383736","#d85794","#45abcb","#ebc92a"]},{"colors":["#221716","#4e2c28","#8a4e3d","#dcab86","#e8d6c2","#e6864f","#bf462b"],"name":"Lunatic Kisses"},{"colors":["#383b34","#4d4c32","#7a603c","#c97759","#e59a84","#cdc4b9"],"src":"https://farbvelo.elastiq.ch/?s=eyJzIjoiOTJjYjI5NzM5MDM0YiIsImEiOjYsImNnIjo0LCJoZyI6ZmFsc2UsImhiIjpmYWxzZSwiaG8iOmZhbHNlLCJoYyI6ZmFsc2UsImh0IjpmYWxzZSwiYiI6ZmFsc2UsInAiOjAuMDQ2MjYyNzEwODEzNDkyMDYsIm1kIjo2MCwiY20iOiJsYWIiLCJmIjoiSHVlIEJpbmdvIiwiYyI6ImhzbHV2Iiwic2MiOmZhbHNlLCJidyI6dHJ1ZSwiYWgiOmZhbHNlLCJpdSI6IiIsImxtIjp0cnVlLCJzbSI6dHJ1ZSwiY3YiOiJoZXgiLCJxbSI6ImFydC1wYWxldHRlIiwibmwiOiJiZXN0T2YifQ==","name":"Spiced King"},{"colors":["#f0ead8","#ff7f75","#f76e7c","#f73668","#021e66"],"name":"Smoked On Melon"},{"colors":["#ff4444","#78b5e3","#f5b111","#d1d1c2","#181d1f"],"name":"Wishing Corn"},{"colors":["#c7c0a7","#ed2860","#f79f07","#33302d","#6666e2"],"name":"Mad of Mana"},{"colors":["#f3c318","#ef6760","#2aaaaa","#5243c2","#eae3e9"],"name":"Teal Me No Commander"},{"colors":["#ddd4c3","#30343f","#e59500","#9bbdad","#e61500"],"name":"Cheddar Bone"}]

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