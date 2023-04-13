const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: 'localhost' | '127.0.0.1',
  user: 'root',
  password: '@ivc102030',
  port: 3306,
  database: '5-ads'
});

module.exports = connection;