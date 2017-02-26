const path = require('path');
const http = require('http');
const express = require('express');

const app = express();
const server = http.Server(app);
const port = 3010;

app.use(express.static(path.resolve('./')));

app.use(/.*/, (req, res) => {
  res.sendFile(path.resolve('index.html'));
});

server.listen(port, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.info('Listening on port %s...', port);
  }
});
