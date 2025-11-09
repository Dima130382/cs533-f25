const express = require('express');
const app = express();
const port = 4001;
const path = require('path');

// Route that sets cookie and serves victim file explicitly.
// IMPORTANT: defined BEFORE express.static so the Set-Cookie header is sent.
app.get('/private/victim.html', (req, res) => {
  res.setHeader('Set-Cookie', 'secret=VERY_SECRET_VALUE; Path=/private');
  res.sendFile(path.join(__dirname, 'public', 'private', 'victim.html'));
});

// Exfil endpoint (for demonstration)
app.get('/exfil', (req, res) => {
  console.log('Exfil received:', req.query.q || '(none)');
  res.send('ok');
});

// Serve remaining static files
app.use(express.static(path.join(__dirname, 'public')));

// Start server
app.listen(port, () => {
  console.log('Frame-path-attack server running at http://localhost:' + port);
});
