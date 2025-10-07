// http-file-server.js

const http = require('http');
const fs = require('fs');
const port = Number(process.argv[2]);
const filePath = process.argv[3];

const server = http.createServer((req, res) => {
  const stream = fs.createReadStream(filePath);
  stream.pipe(res);
});

server.listen(port);
