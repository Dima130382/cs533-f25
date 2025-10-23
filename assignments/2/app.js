const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 4000;

app.use(cookieParser());

//Personality
app.get('/joe-rodon', (req, res) => {
  res.cookie('favorite_personality', 'Joe Rodon');
  res.send(`
    <h1>Joe Rodon</h1>
    <p>Joe Rodon is my favorite soccer player because he’s a strong and reliable defender who represents Leeds United and Wales.</p>
  `);
});

//Place
app.get('/swansea.html', (req, res) => {
  res.cookie('favorite_place', 'Swansea');
  res.send(`
    <h1>Swansea</h1>
    <p>Swansea is special to me because of its coastlines, culture, and deep soccer roots. It is also where my family is from.</p>
  `);
});

//Song
app.get('/little-lion-man', (req, res) => {
  res.cookie('favorite_song', 'Little Lion Man');
  res.send(`
    <h1>Little Lion Man</h1>
    <p>“Little Lion Man” is one of my favorite songs because of its emotion and powerful energy.</p>
  `);
});
//Movie
app.get('/cars.html', (req, res) => {
  res.cookie('favorite_movie', 'Cars');
  res.send(`
    <h1>Cars</h1>
    <p>Cars is a favorite movie because of its fun characters, memorable story, and nostalgic feeling.</p>
  `);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});