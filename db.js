require('dotenv').config();
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

// define('DB_HOST', 'www.iasdcentraldebrasilia.com.br');
// define('DB_USER', 'iasdc624_sgcs_ad');
// define('DB_PASS', 'F_!cs)E88}E[');
// define('DB_NAME', 'iasdc624_sgcs');

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL.');
});

module.exports = connection;