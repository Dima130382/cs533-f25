const net = require('net');

function zeroFill(i) {
  return (i < 10 ? '0' : '') + i;
}

function getFormattedDate() {
  const now = new Date();
  return now.getFullYear() + '-' +
         zeroFill(now.getMonth() + 1) + '-' +
         zeroFill(now.getDate()) + ' ' +
         zeroFill(now.getHours()) + ':' +
         zeroFill(now.getMinutes());
}

const server = net.createServer(socket => {
  socket.end(getFormattedDate() + '\n');
});

server.listen(Number(process.argv[2]));
