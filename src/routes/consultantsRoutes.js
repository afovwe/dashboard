import express from 'express';
import multer from 'multer';
import { db } from './database.js';
import { v2 as cloudinary } from 'cloudinary';

const router = express.Router();
const upload2 = multer(); // Use multer with memory storage for handling image data

// Add your consultant-related routes here



// Example route that requires authentication
app.get('/api/listings', authenticate, async (req, res) => {
  try {
    const query = `
      SELECT l.property_uuid AS propertyUuid, l.title, l.description, l.price,
             l.category, l.date_created AS dateCreated,
             l.date_last_modified AS dateLastModified, lp.image_url AS imageUrl
      FROM listings l
      LEFT JOIN property_profile_images lp ON l.property_uuid = lp.property_uuid
    `;
    const [rows, fields] = await db.query(query);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'No listings in the database' });
    }

    const listings = rows.map((row) => {
      return {
        propertyUuid: row.propertyUuid,
        title: row.title,
        description: row.description,
        price: row.price,
        imagePath: row.imagePath,
        category: row.category,
        dateCreated: row.dateCreated,
        dateLastModified: row.dateLastModified,
        views: row.views,
        imageUrl: row.imageUrl
      };
    });

    res.json(listings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// Example route to get a consultant by consultantUuid
router.get('/:consultantUuid', async (req, res) => {
  // ...
});

// Example route to get all consultants
router.get('/', async (req, res) => {
  // ...
});

// Example route to add a profile image for a consultant
router.post('/profile-image', upload2.single('image'), async (req, res) => {
  // ...
});

// Example route to edit a profile image for a consultant
router.put('/profile-image/:consultantUuid', upload2.single('image'), async (req, res) => {
  // ...
});

export default router;
