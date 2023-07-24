import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();
/*
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
*/


/* console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_DATABASE:', process.env.DB_DATABASE); */ 
 
  const pool = mysql.createPool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,  
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
});

//export default db;

export const db = {
  query: (queryString, escapedValues) => pool.execute(queryString, escapedValues),
};   