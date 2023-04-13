const express = require('express');
require('express-async-errors');
const { routeTeams, routePlayers } = require('./routes');
const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();

app.use(express.json());

app.use('/teams', routeTeams);

app.use('/players', routePlayers);

app.use(errorMiddleware);

module.exports = {
  app,
}