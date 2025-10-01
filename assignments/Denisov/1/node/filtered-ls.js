// filtered-ls.js

const fs = require('fs');
const path = require('path');

const dir = process.argv[2];
const ext = '.' + process.argv[3]; // add the dot for comparison

fs.readdir(dir, (err, files) => {
  if (err) {
    return console.error(err);
  }

  files.forEach(file => {
    if (path.extname(file) === ext) {
      console.log(file);
    }
  });
});
