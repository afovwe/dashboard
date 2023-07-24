import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

 const pool = mysql.createPool({
  host: 'localhost',
  user: 'realtor',
  password: 'realtor',
  database: 'realtor',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export const db = {
  query: (queryString, escapedValues) => pool.execute(queryString, escapedValues),
};  


