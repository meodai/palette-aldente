const palettes = [{"name":"Y.M.C.K","colors":["#eee9e5","#383736","#d85794","#45abcb","#ebc92a"]},{"colors":["#29181e","#81695d","#ce7f50","#ebe1e2","#d74f32","#3b2a54"],"name":"White Tomato"},{"author":"ippsketch","colors":["#ebe7e0","#262626","#bc594e","#bca357","#516b9e"],"name":"Puffy Desert"},{"colors":["#383b34","#4d4c32","#7a603c","#c97759","#e59a84","#cdc4b9"],"src":"https://farbvelo.elastiq.ch/?s=eyJzIjoiOTJjYjI5NzM5MDM0YiIsImEiOjYsImNnIjo0LCJoZyI6ZmFsc2UsImhiIjpmYWxzZSwiaG8iOmZhbHNlLCJoYyI6ZmFsc2UsImh0IjpmYWxzZSwiYiI6ZmFsc2UsInAiOjAuMDQ2MjYyNzEwODEzNDkyMDYsIm1kIjo2MCwiY20iOiJsYWIiLCJmIjoiSHVlIEJpbmdvIiwiYyI6ImhzbHV2Iiwic2MiOmZhbHNlLCJidyI6dHJ1ZSwiYWgiOmZhbHNlLCJpdSI6IiIsImxtIjp0cnVlLCJzbSI6dHJ1ZSwiY3YiOiJoZXgiLCJxbSI6ImFydC1wYWxldHRlIiwibmwiOiJiZXN0T2YifQ==","name":"Spiced King"},{"name":"My palettes","palettes":[{"name":"Y.M.C.K","colors":["#eee9e5","#383736","#d85794","#45abcb","#ebc92a"]},{"name":"Y.M.C.K","colors":["#eee9e5","#383736","#d85794","#45abcb","#ebc92a"]}]}]

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