const http = require('http');
const map = require('through2-map');

const port = Number(process.argv[2]);

const server = http.createServer((req, res) => {
  if (req.method !== 'POST') {
    res.statusCode = 405; // Method Not Allowed
    return res.end('Only POST requests are supported\n');
  }

  req
    .pipe(map(chunk => chunk.toString().toUpperCase()))
    .pipe(res);
});

server.listen(port);