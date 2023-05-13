import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'smartedgeus',
  password: 'smartedgeus',
  database: 'smartedgeus',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export const db = {
  query: (queryString, escapedValues) => pool.execute(queryString, escapedValues),
};
