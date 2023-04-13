const express = require('express');
const connection = require('../db/connection');

const route = express.Router();

route.get('/', async (req, res) => {
  const [result] = await connection.execute('SELECT * FROM teams');
  
  res.status(200).json(result);
})

route.post('/', async (req, res) => {
  const { name, local } = req.body;

  const [result] = await connection.execute(
    'INSERT INTO teams(name, local) VALUES(?, ?)', [name, local] 
  );

  const newTeam = {
    id: result.insertId,
    name,
    local
  }

  res.status(201).json(newTeam);
})

route.put('/:id', async (req, res) => {
  const { name, local } = req.body;
  const { id } = req.params;

  const [[result]] = await connection.execute(`
  SELECT * FROM teams WHERE id = ?`, [id]);

  if(!result) {
    res.status(404).json({ message: 'Time não encontrado'})
  }

  const updatedTeam = await connection.execute(`
  UPDATE teams 
  SET name = ?, local = ? 
  WHERE id = ?`, [name, local, id]);

  const newTeam = {
    id,
    name,
    local
  }

  res.status(200).json(newTeam);
})

route.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const [[result]] = await connection.execute(`
  SELECT * FROM teams WHERE id = ?`, [id]);

  if(!result) {
    res.status(404).json({ message: 'Time não encontrado'})
  }

  await connection.execute(`
    DELETE FROM teams
    WHERE id = ?
  `, [id])

  res.status(204).send();
})

route.get('/:id', async (req, res) => {
  const { id } = req.params;

  const [[result]] = await connection.execute(`
  SELECT * FROM teams WHERE id = ?`, [id]);

  if(!result) {
    res.status(404).json({ message: 'Time não encontrado'})
  }
  
  res.status(200).json(result);
});

module.exports = route;