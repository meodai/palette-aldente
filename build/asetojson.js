import fs from "fs";
import ase from "ase-util";

// list ase file from ./src/ase directory 
const aseFiles = fs.readdirSync("./src/ase");

const palettes = [];

aseFiles.forEach((file) => {
  // make sure it's ase file
  if (file.indexOf(".ase") > -1) {
    const aseContent = fs.readFileSync(`./src/ase/${file}`);
    const aseParsed = ase.read(aseContent);
    const asePalette = aseParsed[0];

    const palFormat = {
      name: asePalette.name,
      colors: asePalette.entries.map((color) => {
        return '#' + color.color.hex.toLowerCase();
      }),
    };

    palettes.push(palFormat);
  }
});

fs.writeFileSync("./src/palettes-ase.json", JSON.stringify(palettes));