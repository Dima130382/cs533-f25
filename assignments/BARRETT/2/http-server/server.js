const fs = require('fs');
const http = require("http")
const PORT = 9000;
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

// Middleware
app.use(cookieParser());

// Index
app.get("/", async (request, response) => {
    // Reads the index.html file which is the page format for the original server location
    fs.readFile('index.html', function(_, data) {
        response.write(data);
        response.end();
    });
});

// Route 1: Personality
app.get('/kobebryant.html', (req, res) => {
  res.cookie('favoritePersonality', 'Kobe Bryant');
  res.send('<h1>Kobe Bryant</h1><p>Kobe inspires me with his work ethic and mentality.</p>');
});

// Route 2: Place
app.get('/outer-banks.html', (req, res) => {
  res.cookie('favoritePlace', 'Outer Banks');
  res.send('<h1>Outer Banks</h1><p>I love the Outer Banks because of its beautiful coastline and peace.</p>');
});

// Route 3: Song/Book
app.get('/dont-worry-it-gets-worse.html', (req, res) => {
  res.cookie('favoriteBook', 'Dont Worry It Gets Worse');
  res.send('<h1>Dont Worry It Gets Worse</h1><p>This book is inspiring and funny at the same time.</p>');
});

// Route 4: Movie/TV
app.get('/mr-church.html', (req, res) => {
  res.cookie('favoriteMovie', 'Mr. Church');
  res.send('<h1>Mr. Church</h1><p>This movie is emotional and meaningful to me.</p>');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});