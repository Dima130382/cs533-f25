const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
const PORT = 4000;

app.use(cookieParser());

function htmlPage(title, bodyHTML) {
  return `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8"><title>${title}</title>
<link rel="icon" href="/favicon.ico">
</head><body>
${bodyHTML}
</body></html>`;
}

// 1) Person — Jim Kerry
app.get('/jim-kerry', (req, res) => {
  res.cookie('favorite_person', 'Jim Kerry', { httpOnly: false, sameSite: 'Lax' });
  res.send(htmlPage('Favorite Person', `
    <h1>Jim Kerry</h1>
    <p>He is fun and positive. I think that our world is missing some good sense of humor nowadays.</p>
  `));
});

// 2) Place — Grand Canyon (serve HTML file and set cookie)
app.get('/grand-canyon.html', (req, res) => {
  res.cookie('favorite_place', 'Grand Canyon', { httpOnly: false, sameSite: 'Lax' });
  res.sendFile(path.join(__dirname, 'public', 'grand-canyon.html'));
});

// 3) Book — Harry Potter series
app.get('/harry-potter', (req, res) => {
  res.cookie('favorite_book', 'Harry Potter series', { httpOnly: false, sameSite: 'Lax' });
  res.send(htmlPage('Favorite Book', `
    <h1>Harry Potter series</h1>
    <p>I thought that fairytales are for kids only, and started to read HP to my daughter. She said: That OK. But I am still reading.</p>
  `));
});

// 4) Movie — The Matrix (serve HTML file and set cookie)
app.get('/the-matrix.html', (req, res) => {
  res.cookie('favorite_movie', 'The Matrix series', { httpOnly: false, sameSite: 'Lax' });
  res.sendFile(path.join(__dirname, 'public', 'the-matrix.html'));
});

// (optional) inspect cookies sent back to server
app.get('/cookies', (req, res) => {
  res.send(htmlPage('Your Cookies', `<pre>${JSON.stringify(req.cookies, null, 2)}</pre>`));
});

// ⬇️ put static AFTER routes so your .html handlers can set cookies first
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});