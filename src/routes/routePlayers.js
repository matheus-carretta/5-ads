const express = require('express');
const connection = require('../db/connection');

const route = express.Router();

route.get('/', async (req, res) => {
  const [result] = await connection.execute('SELECT * FROM players');
  
  res.status(200).json(result);
})

route.post('/', async (req, res) => {
  const { name, goal, teamId } = req.body;

  const [result] = await connection.execute(
    'INSERT INTO players(name, goal, team_id) VALUES(?, ?, ?)', [name, goal, teamId] 
  );

  const newPlayer = {
    id: result.insertId,
    name,
    goal,
    teamId
  }

  res.status(201).json(newPlayer);
})

route.put('/:id', async (req, res) => {
  const { name, goal, teamId } = req.body;
  const { id } = req.params;

  const updatedPlayer = await connection.execute(`
  UPDATE players 
  SET name = ?, goal = ? , team_id = ?
  WHERE id = ?`, [name, goal, teamId, id]);

  const newPlayer = {
    id,
    name,
    goal,
    teamId
  }

  res.status(200).json(newPlayer);
})

route.delete('/:id', async (req, res) => {
  const { id } = req.params;

  await connection.execute(`
    DELETE FROM players
    WHERE id = ?
  `, [id])

  res.status(204).send();
});

route.get('/:id', async (req, res) => {
  const { id } = req.params;

  const [[result]] = await connection.execute(`
  SELECT * FROM players WHERE id = ?`, [id]);
  
  res.status(200).json(result);
});

module.exports = route;