const http = require('http');
const { URL } = require('url');

const port = Number(process.argv[2]);

const server = http.createServer((req, res) => {
  const reqUrl = new URL(req.url, `http://${req.headers.host}`);
  
  // Parse the 'iso' query parameter
  const isoTime = reqUrl.searchParams.get('iso');
  if (!isoTime) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ error: 'Missing iso parameter' }));
  }

  const date = new Date(isoTime);
  let result;

  if (reqUrl.pathname === '/api/parsetime') {
    result = {
      hour: date.getHours(),
      minute: date.getMinutes(),
      second: date.getSeconds()
    };
  } else if (reqUrl.pathname === '/api/unixtime') {
    result = { unixtime: date.getTime() };
  } else {
    res.writeHead(404);
    return res.end();
  }

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(result));
});

server.listen(port);
