import fs from 'fs';

// read the file
const file1 = fs.readFileSync('src/palettes.json', 'utf8');
const file2 = fs.readFileSync('src/palettes-ase.json', 'utf8');

// parse the file
const json1 = JSON.parse(file1);
const json2 = JSON.parse(file2);

// merge the files
const merged = json1.concat(json2);

// write the file
fs.writeFileSync('src/merged.json', JSON.stringify(merged, null, 2));