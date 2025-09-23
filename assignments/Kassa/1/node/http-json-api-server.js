const http = require('http');
http.createServer((req, res) => {
  const u = new URL(req.url, `http://${req.headers.host}`);
  const d = new Date(u.searchParams.get('iso'));
  res.writeHead(200, { 'Content-Type': 'application/json' });
  if (u.pathname === '/api/parsetime') res.end(JSON.stringify({ hour: d.getHours(), minute: d.getMinutes(), second: d.getSeconds() }));
  else if (u.pathname === '/api/unixtime') res.end(JSON.stringify({ unixtime: d.getTime() }));
  else res.writeHead(404).end();
}).listen(Number(process.argv[2]));
