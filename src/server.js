import express from 'express';
import multer from 'multer';
import path from 'path';
import { db } from './database';
import cors from 'cors';
import bodyParser from 'body-parser';
import { v4 as uuidv4 } from 'uuid';
const app = express();

// Serve static files from the public/images directory
app.use(express.static(path.join(__dirname, 'public/images')));

app.use(cors());
app.use(bodyParser.json());

// route to select all articles
app.get('/api/listings', async (req, res) => {
  try {
    const [rows, fields] = await db.query('SELECT * FROM articles');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// route to select all articles for Admin
app.get('/api/dashboard/posts', async (req, res) => {
    try {
      const [rows, fields] = await db.query('SELECT * FROM articles ORDER BY id  DESC');
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  });


// route to select articles by category
app.get('/api/dashboard/post/:category', async (req, res) => {
  try {
    const [rows, fields] = await db.query('SELECT * FROM articles WHERE category = ?', [req.params.category]);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// route to select a post detail by id public
app.get('/api/listings/:id', async (req, res) => {
    try {

       // Set the Access-Control-Allow-Origin header to allow requests from any domain
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200/');

      const [rows, fields] = await db.query('SELECT * FROM articles WHERE id = ?', [req.params.id]);
      if (rows.length === 0) {
        return res.status(404).send('Post not found');
      }
      res.json(rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  });


   // route to post detail
  app.get('/api/dashboard/post-detail/:id', async (req, res) => {
  try {
    const [rows, fields] = await db.query('SELECT * FROM articles WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).send('Post not found');
    }

    const post = rows[0];
    // Check if the post object has a valid image_path property
    if (post.image_path) {
      const imageUrl = path.join(__dirname, 'public/images', post.image_path);
      const postWithImage = {
        title: post.title,
        description: post.description,
        brief_description: post.brief_description,
        image_path: imageUrl,
        date_created: post.date_created
      };
      res.json(postWithImage);
    } else {
      // If image_path is undefined or null, return an error message
      res.status(500).send('Image not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

 // Route to Create a New Post with feature Image
// Create a storage engine for Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', '..', 'smartedgeus', 'src', 'assets')); // Specify the destination folder where the images will be stored
  },
  filename: function (req, file, cb) {
    // Generate a unique filename for the uploaded image
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extname = path.extname(file.originalname);
    cb(null, uniqueSuffix + extname);
  }
});

// Create an instance of the Multer middleware
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5 // 5MB file size limit
  },
  fileFilter: function (req, file, cb) {
    // Accept only JPG, JPEG, and PNG files
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only JPG, JPEG, and PNG file types are allowed'));
  }
});

// Create an Express router
const router = express.Router();

// Define the route to handle the image upload and create a new article
router.post('/dashboard/create-post', upload.single('image'), async (req, res) => {
  try {
    const articleUuid = uuidv4();
    const { title = '', brief_description = '', description = '', category = '' } = req.body;
    const auuId = '12345';
    const ts = Date.now();
    const date_ob = new Date(ts);
    const date = date_ob.getDate();
    const month = date_ob.getMonth() + 1;
    const year = date_ob.getFullYear();
    const hour = date_ob.getHours();
    const minute = date_ob.getMinutes();
    const seconds = date_ob.getSeconds();
    const dateCreated = year + '-' + (month < 10 ? '0' + month : month) + '-' + (date < 10 ? '0' + date : date) + ' ' + hour + ':' + minute;
    const dateLastModified = null;
    const views = 0;

    // Retrieve the file path of the uploaded image
    const imagePath = req.file ? req.file.path : '';

    await db.query(
      'INSERT INTO articles (article_uuid, auuid, title, brief_description, description, image_path, category, date_created, date_last_modified, views) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [articleUuid, auuId, title, brief_description, description, imagePath, category, dateCreated, dateLastModified, views]
    );

    res.json({
      articleUuid,
      auuId,
      title,
      brief_description,
      description,
      imagePath,
      category,
      dateCreated,
      dateLastModified,
      views,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Register the router with your Express app
app.use('/api', router);


// Route to get image and post detail
app.get('/api/image/:article_uuid', async (req, res) => {
  try {
    const articleUuid = req.params.article_uuid || null; // Provide a default value of null if id is not available
    const query = 'SELECT title, description, date_created, image_path FROM articles WHERE article_uuid = ? LIMIT 1';

    const [rows, fields] = await db.query(query, [articleUuid]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Article not found' });
    }

    const { title, description, date_created, image_path } = rows[0];
    const articleData = {
      title,
      description,
      date_created,
      image_path
    };
    res.json(articleData); // Send articleData in the response JSON
  } catch (error) {
    console.error('Error fetching article data from the database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


  // route to get all listings for admin
app.get('/api/dashboard/users', async (req, res) => {
    try {
      const results = await getListingsAllAdminRoute.handler(req, res);
      res.json(results);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  });


  
// route to delete a post
app.delete('/api/dashboard/:articleUuid', async (req, res) => {
    try {
      const { articleUuid } = req.params;
      await db.query('DELETE FROM articles WHERE article_uuid=?', [articleUuid]);
      res.json({ message: 'Post deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  });
  

// start the server
app.listen(3000, () => console.log('Server started on port 3000'));