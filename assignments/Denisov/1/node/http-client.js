// http-client.js

const http = require('http');

const url = process.argv[2];

http.get(url, response => {
  response.setEncoding('utf8'); // ensure we get strings instead of Buffers

  response.on('data', chunk => {
    console.log(chunk);
  });

  response.on('error', err => {
    console.error('Error:', err.message);
  });
});
