const {app} = require('./app');
const connection = require('./db/connection');

const PORT = 3001;

app.listen((PORT, async () => {
  const result = await connection.query('SELECT 1');
  console.log(result);
  console.log(`Rodando na porta ${PORT}`)
}));