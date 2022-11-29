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

export { colorPalettes };
