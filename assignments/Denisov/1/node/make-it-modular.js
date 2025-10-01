// make-it-modular.js

const mymodule = require('./mymodule.js');

const dir = process.argv[2];
const ext = process.argv[3];

mymodule(dir, ext, (err, files) => {
  if (err) {
    return console.error('Error:', err);
  }

  files.forEach(file => console.log(file));
});
