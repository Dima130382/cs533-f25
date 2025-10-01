const fs = require('fs');

const contents = fs.readFileSync(process.argv[2]);

// Convert Buffer to string, split by '\n', subtract 1
const lines = contents.toString().split('\n').length - 1;

console.log(lines);