import express from 'express';
import db from '../database'; // Import your database module here

const router = express.Router();

// Route to get all teams
router.get('/teams', async (req, res) => {
  try {
    const query = 'SELECT * FROM team'; // Replace with your table name
    const [teams, _] = await db.query(query);

    res.json(teams);
  } catch (error) {
    console.error('Error retrieving teams:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
