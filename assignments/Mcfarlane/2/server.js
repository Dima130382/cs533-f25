const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 4000;

app.use(cookieParser());

// Route 1: Favorite Personality
app.get("/personality", (req, res) => {
  res.cookie("favorite_personality", "Keanu Reeves");
  res.send("<h1>Keanu Reeves</h1><p>I admire Keanu Reeves for his humility, generosity, and dedication to his craft.</p>");
});

// Route 2: Favorite Place
app.get("/place", (req, res) => {
  res.cookie("favorite_place", "Kyoto");
  res.send("<h1>Kyoto</h1><p>Kyoto is my favorite place because of its stunning temples, tranquil gardens, and rich cultural history.</p>");
});

// Route 3: Favorite Book
app.get("/book", (req, res) => {
  res.cookie("favorite_book", "The Alchemist");
  res.send("<h1>The Alchemist</h1><p>This book by Paulo Coelho inspires me to follow my dreams and trust the journey of life.</p>");
});

// Route 4: Favorite Movie
app.get("/movie", (req, res) => {
  res.cookie("favorite_movie", "Inception");
  res.send("<h1>Inception</h1><p>I love this movie because of its brilliant storytelling and mind-bending concept of dreams within dreams.</p>");
});

// server starting ...
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
