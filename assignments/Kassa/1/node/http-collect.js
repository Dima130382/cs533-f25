const http = require('http');

const url = process.argv[2];
let data = '';

http.get(url, (response) => {
  response.setEncoding('utf8');

  response.on('data', (chunk) => {
    data += chunk;
  });

  response.on('end', () => {
    console.log(data.length);
    console.log(data);
  });

  response.on('error', (err) => {
    console.error('Error:', err);
  });
});
