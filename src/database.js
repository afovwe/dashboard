import mysql from 'mysql2/promise';
import dotenv from 'dotenv';


/*  const pool = mysql.createPool({
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


// Load environment variables from .env file
dotenv.config();

const pool = mysql.createPool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,  
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
});

const db = {
  query: async (queryString, escapedValues) => {
    try {
      const connection = await pool.getConnection();
      const [rows] = await connection.execute(queryString, escapedValues);
      connection.release();
      return rows;
    } catch (error) {
      console.error('Error executing database query:', error);
      throw error;
    }
  }
};

export { db };