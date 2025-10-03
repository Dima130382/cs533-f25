const express = require('express');
const path = require('path');

const app = express();
const PORT = 4000;

const cookieParser = require('cookie-parser');

app.use(cookieParser('super-secret-key123'));

// Setup to server static files
app.use(express.static('public'));

app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'favicon.ico'));
});

// Setup to serve HTML files
app.set('view engine', 'html');
app.engine('html', require('fs').readFile);

// Routes for favorites pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/monk', (req, res) => {
    res.cookie('monk-cookie', 'Monk is a great show', {
        maxAge: 24 * 60 * 60 * 1000, // 1 days
        httpOnly: true
    });
    res.sendFile(path.join(__dirname, 'views', 'monk.html'));
});

app.get('/psych', (req, res) => {
    res.cookie('psych-cookie', 'Psych is a great show', {
        maxAge: 24 * 60 * 60 * 1000, // 1 days
        httpOnly: true
    });
    res.sendFile(path.join(__dirname, 'views', 'psych.html'));
});

app.get('/mr-robot', (req, res) => {
    res.cookie('mr-robot-cookie', 'Mr.Robot is a great show', {
        maxAge: 24 * 60 * 60 * 1000, // 1 days
        httpOnly: true
    });
    res.sendFile(path.join(__dirname, 'views', 'mr-robot.html'));
});

app.get('/parks-and-rec', (req, res) => {
    res.cookie('parks-and-rec-cookie', 'Parks and Rec is a great show', {
        maxAge: 24 * 60 * 60 * 1000, // 1 days
        httpOnly: true
    });
    res.sendFile(path.join(__dirname, 'views', 'parks-and-rec.html'));
});

// 404 handler
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Available pages:`);
    console.log(`- Home: http://localhost:${PORT}/`);
    console.log(`- Monk: http://localhost:${PORT}/monk`);
    console.log(`- Psych: http://localhost:${PORT}/psych`);
    console.log(`- Mr-Robot: http://localhost:${PORT}/mr-robot`);
    console.log(`- Parks And Rec: http://localhost:${PORT}/parks-and-rec`);
});