import express from 'express';
import multer from 'multer';
import { db } from './database.js';
import { v2 as cloudinary } from 'cloudinary';

const router = express.Router();
const upload2 = multer(); // Use multer with memory storage for handling image data

// Add your property-related routes here

// Example route to add an image to a property
router.post('/property-image', upload2.single('image'), async (req, res) => {
  // ...
});

// Example route to edit a property image
router.put('/edit-property-image/:propertyUuid', upload2.single('image'), async (req, res) => {
  // ...
});

export default router;
