import express from 'express';
import { db } from './database.js';


const router = express.Router();


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
