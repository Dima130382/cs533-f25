const http = require('http');

const urls = process.argv.slice(2);
const results = [];
let count = 0;

function printResults() {
  results.forEach(result => console.log(result));
}

function httpGet(index) {
  http.get(urls[index], (response) => {
    let data = '';
    response.setEncoding('utf8');

    response.on('data', chunk => data += chunk);
    response.on('end', () => {
      results[index] = data;
      count++;
      if (count === urls.length) {
        printResults();
      }
    });
  }).on('error', err => {
    console.error(err);
  });
}

urls.forEach((_, i) => httpGet(i));
