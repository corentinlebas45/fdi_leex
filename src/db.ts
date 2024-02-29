import mysql from 'mysql2';

export const db = mysql.createConnection({
  host: 'localhost',
  user: 'etna',
  password: 'password',
  database: 'api_fdi',
  connectionLimit: 10,
});
