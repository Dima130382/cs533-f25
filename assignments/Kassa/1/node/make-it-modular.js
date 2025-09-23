const mymodule = require('./mymodule');
const dir = process.argv[2];
const ext = process.argv[3];

mymodule(dir, ext, (err, data) => {
  if (err) {
    console.error('Error:', err);
    return;
  }
  data.forEach(file => console.log(file));
});
