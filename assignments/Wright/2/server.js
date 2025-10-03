const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
const PORT = 4000;

app.use(cookieParser());

// ✅ Serve the entire favicon_io folder
app.use('/favicon_io', express.static(path.join(__dirname, 'favicon_io')));

// ✅ Explicit route for /favicon.ico (browsers look here by default)
app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.join(__dirname, 'favicon_io', 'favicon.ico'));
});

function pageLayout(title, body) {
  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>${title}</title>
  <!-- ✅ Favicon links with cache-busting -->
  <link rel="icon" type="image/x-icon" href="/favicon.ico?v=2">
  <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico?v=2">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon_io/favicon-32x32.png?v=2">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon_io/favicon-16x16.png?v=2">
</head>
<body style="font-family:system-ui;max-width:760px;margin:2rem auto;line-height:1.6">
  <h1>${title}</h1>
  ${body}
</body>
</html>`;
}

// Home page
app.get('/', (req, res) => {
  res.type('html').send(pageLayout('CS 433/533 – Assignment 2', `
    <h2>Here are some of my favorite things:</h2>
    <ul>
      <li><a href="/johnlegend">Anthony's Favorite Artist</a></li>
      <li><a href="/spain">Anthony's Favorite Place</a></li>
      <li><a href="/chernobyl">Anthony's Favorite Book</a></li>
      <li><a href="/invincible">Anthony's Favorite TV Show</a></li>
    </ul>
  `));
});

// John Legend (artist)
app.get(['/johnlegend', '/johnlegend.html'], (req, res) => {
  res.cookie('favorite_artist', 'John Legend', { sameSite: 'Lax' });
  res.type('html').send(pageLayout('John Legend', `
    <p>I picked John Legend because I like his music and the way he mixes R&B with pop. 
    He’s easy to listen to and has been solid for years.</p>
    <p><a href="/">Return Home</a></p>
  `));
});

// Spain (place)
app.get(['/spain', '/spain.html'], (req, res) => {
  res.cookie('favorite_place', 'Spain', { sameSite: 'Lax' });
  res.type('html').send(pageLayout('Spain', `
    <p>I chose Spain because it has a lot to offer, such as good food, cool cities, and a lot of history. 
    It just seems like a place worth visiting.</p>
    <p><a href="/">Return Home</a></p>
  `));
});

// Midnight in Chernobyl (book)
app.get(['/chernobyl', '/chernobyl.html'], (req, res) => {
  res.cookie('favorite_book', 'Midnight in Chernobyl by Adam Higginbotham', { sameSite: 'Lax' });
  res.type('html').send(pageLayout('Midnight in Chernobyl', `
    <p>I picked <em>Midnight in Chernobyl</em> because it explains the disaster in a way that’s easy to follow but still detailed. 
    It’s both interesting and informative.</p>
    <p><a href="/">Return Home</a></p>
  `));
});

// Invincible (TV series)
app.get(['/invincible', '/invincible.html'], (req, res) => {
  res.cookie('favorite_tvseries', 'Invincible', { sameSite: 'Lax' });
  res.type('html').send(pageLayout('Invincible', `
    <p>I went with <em>Invincible</em> because it has great characters and action. 
    I'm a big fan of the multiverse and time travel.</p>
    <p><a href="/">Return Home</a></p>
  `));
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
  console.log('Check:');
  console.log(` http://localhost:${PORT}/johnlegend`);
  console.log(` http://localhost:${PORT}/spain`);
  console.log(` http://localhost:${PORT}/chernobyl`);
  console.log(` http://localhost:${PORT}/invincible`);
});
