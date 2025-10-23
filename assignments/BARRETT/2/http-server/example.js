const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const port = 4000;

// Middleware to parse cookies
app.use(cookieParser());

// Route 1: Personality
app.get('/kobebryant.html', (req, res) => {
  res.cookie('favoritePersonality', 'Kobe Bryant');
  res.send(`
    <html>
      <head><title>My Favorite: Kobe Bryant</title></head>
      <body>
        <h1>Why I love Kobe Bryant</h1>
        <p>Kobe inspires me with his work ethic and mentality.</p>
        <p>Cookie set: ${req.cookies.favorite}</p>
      </body>
    </html>
  `);
});

// Route 2: Place
app.get('/big-sur.html', (req, res) => {
  res.cookie('favoritePlace', 'Big Sur');
  res.send(`
    <html>
      <head><title>My Favorite: Big Sur</title></head>
      <body>
        <h1>Why I want to visit Big Sur</h1>
        <p>I love Big Sur because of its beautiful coastline and peace.</p>
        <p>Cookie set: ${req.cookies.favorite}</p>
      </body>
    </html>
  `);
});

// Route 3: Book
app.get('/born-a-crime.html', (req, res) => {
  res.cookie('favoriteBook', 'Born a Crime');
  res.send(`
    <html>
      <head><title>My Favorite: Born a Crime</title></head>
      <body>
        <h1>Why I love "Born a Crime"</h1>
        <p>"I love this book because it is inspiring and funny at the same time.</p>
        <p>Cookie set: ${req.cookies.favorite}</p>
      </body>
    </html>
  `);
});

// Route 4: Movie
app.get('/a-silent-voice.html', (req, res) => {
  res.cookie('favoriteMovie', 'A Silent Voice');
  res.send(`
    <html>
      <head><title>My Favorite: A Silent Voice</title></head>
      <body>
        <h1>Why I love "A Silent Voice"</h1>
        <p>I love this movie because it is emotional and meaningful to me.</p>
        <p>Cookie set: ${req.cookies.favorite}</p>
      </body>
    </html>
  `);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
