const palettes = [{"name":"Anaheim","colors":["#ebdfd3","#df9f2c","#5b3524","#a09684","#8b7f6c"]},{"name":"Ando","colors":["#2b292b","#786e66","#3f3e3a","#cac6c3","#afa69e"]},{"name":"Arianda","colors":["#d95f76","#b5a2a1","#f2911b","#d9501e","#d93829"]},{"name":"Asuka","colors":["#bfb7af","#d8ccc0","#f2e2d5","#a59f9b","#f2d7cd"]},{"name":"Benelit","colors":["#f2f5ee","#e0ddd8","#dc3638","#757472","#201c1d"]},{"name":"Blush Response","colors":["#8c4a50","#c35b4e","#d9aa8f","#e5cbbf","#f2edea"]},{"name":"Bosmak","colors":["#f7eee5","#f7bb41","#f6c698","#f8fdff","#f2a476"]},{"name":"Bradshaw","colors":["#f28095","#da5069","#fc8461","#e19a7e","#cea39d"]},{"name":"Burnt Berry","colors":["#dccfc6","#9d917b","#463a2a","#d6c2b9","#b76750"]},{"name":"Cacti Bloom","colors":["#a6243c","#f21d56","#f2bf27","#f29422","#2d3c1f"]},{"name":"Cacti Dream","colors":["#29361b","#f39233","#f3e3d6","#140f0c","#cc3314"]},{"name":"Cappadocia","colors":["#eeeff4","#d1bbae","#1d1e23","#b14441","#af8976"]},{"name":"Caramel","colors":["#d3c3b6","#bab2a7","#bf9c74","#bf5b03","#993503"]},{"name":"Checkov","colors":["#112233","#adabae","#16474a","#133536","#c26646"]},{"name":"Chiharu","colors":["#dbd0c3","#f2a74b","#d88236","#724116","#a55f21"]},{"name":"Cocos","colors":["#0c0c0e","#837560","#e28a27","#9d5d24","#f8fdfe"]},{"name":"Coffee Cup","colors":["#32363f","#d7cec5","#f3efec","#956446","#e6e2df"]},{"name":"Earthenware","colors":["#918679","#d1c9be","#fafafa","#594b42","#d3a679"]},{"name":"Edo","colors":["#fffeff","#a58c68","#2f2a26","#8c847a","#df3f36"]},{"name":"Elevated Basic","colors":["#4b7ba6","#4e5925","#f2b138","#f2e8dc","#f25749"]},{"name":"Ellsworth","colors":["#f0eee2","#a18a6b","#61574e","#3f3f3d","#0d0d0d"]},{"name":"Esquisse","colors":["#c20a29","#d6a4b5","#0d1e5a","#023f36","#0e0e0e"]},{"name":"Fashion","colors":["#bf0326","#592f56","#f2d441","#f2eadc","#bf775d"]},{"name":"Futaba","colors":["#d9831a","#9f724b","#ece3de","#cf9071","#8b3305"]},{"name":"Gelato Prime","colors":["#f29f05","#f3ab00","#efc362","#722835","#d44f49"]},{"name":"Grace","colors":["#dfd4cb","#143c21","#816c4b","#e0a7b8","#f8623b"]},{"name":"Harimau","colors":["#281740","#f29d35","#04504e","#f27405","#f24c3d"]},{"name":"Hermione","colors":["#d98b2b","#a35e46","#d3d3d3","#d9593d","#d9bbb8"]},{"name":"High Fashion","colors":["#cd2525","#c04483","#2d8579","#1a1921","#ddd8d4"]},{"name":"Hua Kanda","colors":["#ecf2f0","#d9946c","#260b01","#80875e","#d96459"]},{"name":"Kekkon","colors":["#f2eee5","#d9bea7","#bf9a7a","#73554c","#bf7e78"]},{"name":"Koh Chela","colors":["#cc8f5c","#935a45","#968579","#8c3211","#753326"]},{"name":"Lotus Plain","colors":["#eae6e2","#d9865a","#4f616f","#f2bfac","#d96055"]},{"name":"Makoto","colors":["#b0a48e","#f1c7ae","#f3f0eb","#aa8773","#e4cbb7"]},{"name":"Mallow","colors":["#bdbbbf","#e3e1e5","#f0cec7","#a7999a","#edd8d1"]},{"name":"Maneki","colors":["#eecb05","#cb9d56","#fffbff","#f22a13","#415237"]},{"name":"Marit","colors":["#f1ab94","#e9cbb2","#e0d7bd","#e3820e","#d06709"]},{"name":"Marshmallow Sunset","colors":["#50566c","#eaddcd","#e0c694","#7d8f9c","#dbb48d"]},{"name":"Monatsblatter","colors":["#f0ede4","#f0ede4","#f0ede4","#403a36","#26221a"]},{"name":"Morgana","colors":["#325952","#517369","#91caaf","#838c7d","#9ca692"]},{"name":"Mulberry","colors":["#e1cfdf","#adabae","#204d50","#133536","#aa7346"]},{"name":"Napoli","colors":["#bf7c03","#e7e3de","#696262","#f2b8bf","#131210"]},{"name":"Nasturtiums","colors":["#d1d2aa","#5c7346","#eeaf24","#d9771e","#d7481e"]},{"name":"Naya","colors":["#e7cfdf","#adabae","#16474a","#133536","#c26646"]},{"name":"New Eden","colors":["#ee9b0f","#ff7518","#fe8c68","#ff5001","#b87332"]},{"name":"Nikkeidai","colors":["#f66689","#65136c","#f22e0e","#00a75e","#d7d7d7"]},{"name":"Ochre Comfort","colors":["#d9d7bf","#f2cb05","#f2b705","#f29f05","#f27405"]},{"name":"Okage","colors":["#ff4b2a","#ff9488","#f1857a","#d6d6d6","#413b31"]},{"name":"Okumura","colors":["#262326","#a69b8d","#d9b79a","#d9a08b","#a67e7b"]},{"name":"Pink Whiskey","colors":["#f2ede9","#fddbd2","#b2b3ad","#35342e","#bd887a"]},{"name":"Plum Cupcake","colors":["#401323","#6a2e43","#8c3a60","#a65866","#d9a7b0"]},{"name":"Pops","colors":["#a60a33","#a61c5c","#380140","#f27329","#d91604"]},{"name":"Pot Pourri","colors":["#c6a890","#3e2924","#feba3d","#fecabd","#fb4a1a"]},{"name":"Scarry","colors":["#06c2ec","#f0d10b","#be9820","#f15a38","#f1f1f0"]},{"name":"Sherbet","colors":["#fdc9a4","#f5b1a6","#eca6a8","#e1adb9","#d0bfd7"]},{"name":"Sojiro","colors":["#ead8c4","#bb9e40","#7d8846","#ce906b","#c3c7a6"]},{"name":"Stockholm Lollipop","colors":["#1c2137","#284555","#de4639","#db6528","#f5ad0d"]},{"name":"Sunflower","colors":["#eeacb0","#e94b24","#020001","#f6cb0d","#f3e6de"]},{"name":"Takamaki","colors":["#bf4974","#f257a0","#d971aa","#aebf8a","#3c401d"]},{"name":"The Phantom Geisha","colors":["#f1f3ee","#bf925a","#464e41","#a62014","#bf1515"]},{"name":"Vegan Cheesecake","colors":["#e6e4cc","#bf8c60","#d03814","#97632b","#edbeaa"]}]

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