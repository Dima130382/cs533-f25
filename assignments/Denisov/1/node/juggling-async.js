// juggling-async.js

const http = require('http');

const urls = process.argv.slice(2);
const results = [];
let count = 0;

function printResults() {
  for (let i = 0; i < urls.length; i++) {
    console.log(results[i]);
  }
}

function fetchData(index) {
  http.get(urls[index], response => {
    let data = '';
    response.setEncoding('utf8');

    response.on('data', chunk => {
      data += chunk;
    });

    response.on('end', () => {
      results[index] = data;
      count++;

      if (count === urls.length) {
        printResults();
      }
    });

    response.on('error', err => {
      console.error('Error:', err.message);
    });
  });
}

// Start requests for all URLs
for (let i = 0; i < urls.length; i++) {
  fetchData(i);
}
