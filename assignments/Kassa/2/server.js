const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const app = express();
const port = 4000;

app.use(cookieParser());
app.use(express.static(path.join(__dirname)));

app.get('/mymom', (req, res) => {
    res.cookie('favorite_person', 'MY MOM', { maxAge: 900000, httpOnly: true });
    res.sendFile(path.join(__dirname, 'mymom.html'));
});

app.get('/paris', (req, res) => {
    res.cookie('favorite_place', 'PARIS', { maxAge: 900000, httpOnly: true });
    res.sendFile(path.join(__dirname, 'paris.html'));
});

app.get('/youwerentmeanttobehuman', (req, res) => {
    res.cookie('favorite_book', 'You Weren\'t Meant to Be Human', { maxAge: 900000, httpOnly: true });
    res.sendFile(path.join(__dirname, 'youwerentmeanttobehuman.html'));
});

app.get('/badfaith', (req, res) => {
    res.cookie('favorite_movie', 'BAD FAITH', { maxAge: 900000, httpOnly: true });
    res.sendFile(path.join(__dirname, 'badfaith.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});