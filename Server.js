const express = require('express');
const path = require('path');
const app = express();
const port = 5500;

const publicPath = path.join(__dirname, '');

app.use(express.static(publicPath));

app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'music.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});