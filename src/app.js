const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('olá')
});

module.exports = {
  app,
}