import express from 'express';
import multer from 'multer';
import path from 'path';
import { db } from './database.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import { v4 as uuidv4 } from 'uuid';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import history from 'connect-history-api-fallback';


dotenv.config();


// Use Firebase Admin in your Express routes and middleware
const app = express();

// Serve static files from the public/images directory

// Initialize Firebase Admin using your service account credentials

// Serve static files from the public/images directory
app.use(express.static(path.join(__dirname, 'public/images')));

app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, '../dist/realtor_exp_frontend'), {maxAge: '1y', etag: false}));
 


app.use(history());


// JWT secret key

const secretKey = process.env.JWT_SECRET;

const authenticate = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'You are not authorized to access this page' });
  }

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), secretKey);

    // Add the decoded user information to the request object
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};



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




// Route to get listing detail by propertyUuid
//Woking fine 
app.get('/api/listing/:propertyUuid', authenticate,  async (req, res) => {
  try {
    const propertyUuid = req.params.propertyUuid || null; // Provide a default value of null if id is not available
    
    const query = `
    SELECT l.property_uuid AS propertyUuid, l.title AS title, l.description AS description,
      l.category AS category, l.price, l.city AS city, l.state AS state, l.date_created AS dateCreated,
      lp.image_url AS imageUrl
      FROM listings l
    LEFT JOIN property_profile_images lp ON l.property_uuid = lp.property_uuid
    WHERE l.property_uuid = ?
    LIMIT 1`;

    const [rows, fields] = await db.query(query, [propertyUuid]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Listing not found' });
    }

    const { title, description, category, price, city, state, dateCreated, imageUrl } = rows[0];
    const listingData = {
      propertyUuid,
      title,
      description,            
      category,
      price,
      city, 
      state,
      dateCreated,
      imageUrl
    };
    
    res.json(listingData); // Send listingData in the response JSON
  } catch (error) {
    console.error('Error fetching article data from the database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to delete a listing by propertyUuid
// Route to delete a listing by propertyUuid
app.delete('/api/listing/:propertyUuid',  authenticate, async (req, res) => {
  try {
    const propertyUuid = req.params.propertyUuid || null; // Provide a default value of null if propertyUuid is not available

    // Check if the listing exists before deleting
    const checkQuery = 'SELECT property_uuid FROM listings WHERE property_uuid = ?';
    const [checkRows, checkFields] = await db.query(checkQuery, [propertyUuid]);
    if (checkRows.length === 0) {
      return res.status(404).json({ error: 'Listing not found' });
    }

    // Delete the listing from listings table
    const deleteListingQuery = 'DELETE FROM listings WHERE property_uuid = ?';
    await db.query(deleteListingQuery, [propertyUuid]);

    // Delete the corresponding image from property_profile_images table
    const deleteImageQuery = 'DELETE FROM property_profile_images WHERE property_uuid = ?';
    await db.query(deleteImageQuery, [propertyUuid]);

    res.json({ message: 'Listing deleted successfully' });
  } catch (error) {
    console.error('Error deleting listing from the database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



   // Route to Create a New Post with feature Image 
// Create a storage engine for Multer 
//C:\Users\23481\projects\angular_projects\realtor\realtor_exp_frontend\src\assets\profileImage

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', '..', 'realtor_exp_frontend', 'src', 'assets')); // Specify the destination folder where the images will be stored
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
//const router = express.Router(); //Initail place before

// Define the route to handle the image upload and create a new article
app.post('/api/dashboard/add-listing', authenticate, async (req, res) => {
  try {
    const propertyUuid = uuidv4();
    const { title = '', description = '', category = '', price = '', city = '', state = '' } = req.body;    
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
    //const imagePath = req.file ? req.file.path : '';
   // const imagePath = req.file ? path.basename(req.file.path) : '';

    await db.query(
      'INSERT INTO listings (property_uuid, title, description, category, price, city, state, date_created, date_last_modified, views) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ? )',
      [propertyUuid, title, description, category, price, city, state, dateCreated, dateLastModified, views]
    );

    res.json({
      propertyUuid,    
      title,      
      description,      
      category,
      price, 
      city, 
      state,
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
//app.use('/api', router);



/*============================== CONSULTANTS ROUTES ======================================== */


// Define the route to select a consultant based on consultant_uuid
//  Tested and is working
app.get('/api/consultants/:consultantUuid', async (req, res) => {
  try {
    const consultantUuid = req.params.consultantUuid;
    const [consultant] = await db.query('SELECT * FROM consultants WHERE consultant_uuid = ?', [consultantUuid]);

    if (consultant && consultant.length > 0) {
      res.json(consultant[0]);
    } else {
      res.status(404).json({ message: 'Consultant not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});



// Define the route to select all consultants
//Tested with postman and it worked

app.get('/api/consultants', async (req, res) => {
  try {
    const [consultants] = await db.query('SELECT * FROM consultants');
    const formattedConsultants = consultants.map(consultant => ({
      consultantUuid: consultant.consultant_uuid,
      fullName: consultant.fname,
      phoneNumber: consultant.phone_number,
      email: consultant.email,
      usernameCid: consultant.username_cid,
      sponsorCid: consultant.sponsor_cid,
      password: consultant.password,
      registrationDate: consultant.registration_date,
      gender: consultant.gender,
      city: consultant.city,
      teamId: consultant.team_id,
      rank: consultant.rank
    }));
    res.json(formattedConsultants);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Route to get sponsorCid 

app.get('/api/sponsor/:usernameCid', async (req, res) => {
  const { usernameCid } = req.params;

  try {
    const [consultants] = await db.query('SELECT * FROM consultants WHERE username_cid = ?', [usernameCid]);

    if (consultants.length === 0) {
      return res.status(404).json({ error: 'Consultant not found' });
    }

    const consultant = consultants[0];

    const selectedConsultant = {
      fullName: consultant.fname,
      usernameCid: consultant.username_cid,
      teamId: consultant.team_id,
      rank: consultant.rank
    };

    res.json(selectedConsultant);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});



// Define the route to handle Signup
// Tested with postman and it worked
app.post('/api/consultants/add-signup', async (req, res) => {
  try {
    const { phoneNumber = '', email = '', password = '' } = req.body;

    // Check if phone number already exists
    const [existingPhoneNumber] = await db.query('SELECT * FROM consultants WHERE phone_number = ?', [phoneNumber]);
    if (existingPhoneNumber.length > 0) {
      return res.status(400).json({ error: 'User with this phone number already exists' });
    }

    // Check if email already exists
    const [existingEmail] = await db.query('SELECT * FROM consultants WHERE email = ?', [email]);
    if (existingEmail.length > 0) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Continue with the rest of the code
    const consultantUuid = uuidv4();
    const { fullName = '', sponsorCid = '', gender = '', city = '', teamId = '', rank = '' } = req.body;
    const usernameCid = 'req' + phoneNumber;
    const ts = Date.now();
    const date_ob = new Date(ts);
    const date = date_ob.getDate();
    const month = date_ob.getMonth() + 1;
    const year = date_ob.getFullYear();
    const hour = date_ob.getHours();
    const minute = date_ob.getMinutes();
    const seconds = date_ob.getSeconds();
    const registrationDate = `${year}-${(month < 10 ? '0' + month : month)}-${(date < 10 ? '0' + date : date)} ${hour}:${minute}`;

    await db.query(
      'INSERT INTO consultants (consultant_uuid, fname, phone_number, email, username_cid, sponsor_cid, password, registration_date, city, team_id, rank) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        consultantUuid, fullName, phoneNumber, email, usernameCid, sponsorCid, hashedPassword, registrationDate, city, teamId, rank,
      ]
    );

    res.json({
      consultantUuid, fullName, phoneNumber, email, usernameCid, sponsorCid, registrationDate, gender, city, teamId, rank,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Route to handle login
app.post('/api/consultants/login', async (req, res) => {
  try {
    const { email = '', usernameCid = '', password = '' } = req.body;

    // Find the user by email or usernameCid
    const [user] = await db.query('SELECT * FROM consultants WHERE email = ? OR username_cid = ?', [email, usernameCid]);
    if (user.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the provided password matches the hashed password
    const isPasswordValid = await bcryptjs.compare(password, user[0].password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // If the password is valid, proceed with the login logic
    const secretKey = process.env.JWT_SECRET;
    // Generate a JWT token with the user's ID and role
    const token = jwt.sign(
      { userId: user[0].id, isAdmin: user[0].isAdmin }, // Include the isAdmin property in the payload
      secretKey,
      { expiresIn: '1h' }
    );

    // Return the token and additional information
    res.json({
      message: 'Login successful',
      token: token,
      isAdmin: user[0].isAdmin // Include the isAdmin property in the response
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
}); 

//const router = express.Router();  // for now
// Register the router with your Express app
//app.use('/api', router);


// Get consultant by email or username_cid
app.get('/api/consultant/:emailUsernameCid', authenticate, async (req, res) => {
  try {
    const emailUsernameCid = req.params.emailUsernameCid;
    const query = `
      SELECT c.consultant_uuid AS consultantUuid, c.fname AS fullName, c.phone_number AS phoneNumber,
        c.email, c.username_cid AS usernameCid, c.sponsor_cid AS sponsorCid, c.password,
        c.registration_date AS registrationDate, c.gender, c.city, c.team_id AS teamId, c.rank,
        cp.image_url AS imageUrl
      FROM consultants c
      LEFT JOIN consultants_profile_images cp ON c.consultant_uuid = cp.consultant_uuid
      WHERE c.email = ? OR c.username_cid = ?
      LIMIT 1`;
    const [consultant] = await db.query(query, [emailUsernameCid, emailUsernameCid]);

    if (consultant) {
      res.json(consultant);
    } else {
      res.status(404).json({ message: 'Consultant not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});


/*================================= Network Query=================================*/
//Worked


app.get('/api/downline/:sponsorId', authenticate, async (req, res) => {
  try {
    const sponsorId = req.params.sponsorId;
    const query = `
      SELECT fname AS fullName, phone_number AS phoneNumber, email, username_cid AS usernameCid, sponsor_cid AS parentId, team_id AS team, rank As level
      FROM consultants
      WHERE sponsor_cid = ?
    `;
    const [rows] = await db.query(query, [sponsorId]);

    if (rows.length > 0) {
      const consultants = [];

      for (const consultant of rows) {
        const downlines = await getDownlines(consultant.usernameCid);
        consultant.downlines = downlines;
        consultants.push(consultant);
      }

      res.json(consultants);
    } else {
      res.status(404).json({ message: 'No consultants found for the given sponsor ID' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

async function getDownlines(parentId) {
  const downlineQuery = `
    SELECT fname AS fullName, phone_number AS phoneNumber, email, username_cid AS usernameCid, sponsor_cid AS parentId, team_id AS team, rank As level
    FROM consultants
    WHERE sponsor_cid = ?
  `;

  const [downlineRows] = await db.query(downlineQuery, [parentId]);

  const downlines = [];

  for (const downline of downlineRows) {
    const subDownlines = await getDownlines(downline.usernameCid);
    downline.downlines = subDownlines;
    downlines.push(downline);
  }

  return downlines;
}



// Route to get the whole of consultant details with consultant's uuid 
app.get('/api/consultant-uuid/:consultantUuid', authenticate, async (req, res) => {
  const { consultantUuid } = req.params;
  try {
    const [consultants] = await db.query(
      `SELECT c.consultant_uuid, c.fname, c.phone_number, c.email, c.username_cid, c.sponsor_cid, c.registration_date, c.date_birth, c.gender, c.address, c.city,  c.state, c.country,
                cbd.account_number, cbd.account_name, cbd.bank_name,
                cpi.image_url
          FROM consultants c
          LEFT JOIN consultant_bank_details cbd ON c.consultant_uuid = cbd.consultant_uuid
          LEFT JOIN consultants_profile_images cpi ON c.consultant_uuid = cpi.consultant_uuid
      WHERE c.consultant_uuid = ?`,
      [consultantUuid]
    );

    if (consultants.length === 0) {
      return res.status(404).json({ error: 'Consultant not found' });
    }
    
    const consultant = consultants[0];

    const selectedConsultant = {
      consultantUuid: consultant.consultant_uuid,
      fullName: consultant.fname,
      phoneNumber: consultant.phone_number,
      email: consultant.email,
      usernameCid: consultant.username_cid,
      sponsorCid: consultant.sponsor_cid,
      registrationDate: consultant.registration_date,
      dateBirth: consultant.date_birth, 
      gender: consultant.gender, 
      address: consultant.address,
      city: consultant.city,
      state: consultant.state,
      country: consultant.country,
      accountNumber: consultant.account_number,
      accountName: consultant.account_name,
      bankName: consultant.bank_name,
      imageUrl: consultant.image_url
    };

    res.json(selectedConsultant);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Define the route to handle editing consultant details 
//Tested with postman and it worked
app.put('/api/consultants/edit/:consultantUuid', authenticate, async (req, res) => {
  try {
    const consultantUuid = req.params.consultantUuid;
    const { fullName = '', phoneNumber = '', email = '', sponsorCid = '', dateBirth = '', gender = '', address = '', city = '', state = '', country = '' } = req.body;
    const usernameCid = 'req' + phoneNumber;  

    await db.query(
      'UPDATE consultants SET fname = ?, phone_number = ?, email = ?, username_cid = ?, sponsor_cid = ?, date_birth = ?, gender = ?, address = ?, city = ?, state = ?, country = ? WHERE consultant_uuid = ?',
      [fullName, phoneNumber, email, usernameCid, sponsorCid, dateBirth, gender, address, city, state, country, consultantUuid]
    );

    res.json({
      message: 'Consultant details updated successfully',
      consultantUuid, fullName, phoneNumber, email,  usernameCid, sponsorCid, dateBirth, gender, address,  city,  state,  country
       });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Register the router with your Express app
//app.use('/api', router);



// Define the route to delete a consultant based on consultant_uuid
//Tested with postman and it worked
app.delete('/api/consultants/:consultantUuid', authenticate, async (req, res) => {
  try {
    const consultantUuid = req.params.consultantUuid;
    
    // Check if the consultant exists
    const [consultant] = await db.query('SELECT * FROM consultants WHERE consultant_uuid = ?', [consultantUuid]);
    
    if (consultant && consultant.length > 0) {
      // Delete the consultant
      await db.query('DELETE FROM consultants WHERE consultant_uuid = ?', [consultantUuid]);
      res.json({ message: 'Consultant deleted successfully' });
    } else {
      res.status(404).json({ message: 'Consultant not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Route  to insert consultant account details:
// Tested and is working
app.post('/api/consultants/accounts', authenticate, async (req, res) => {
  try {
    // Extract the request body data
    const {consultantUuid, accountNumber, accountName, bankName} = req.body;

    // Insert the consultant account details into the database
    await db.query(
      'INSERT INTO consultant_bank_details (consultant_uuid, account_number, account_name, bank_name) VALUES (?, ?, ?, ?)',
      [consultantUuid, accountNumber, accountName, bankName]
    );

   res.json({ consultantUuid, accountNumber, accountName, bankName });
  } catch (err) {
    console.error('Error inserting consultant account details:', err);
    res.status(500).json({ error: 'Server Error' });
  }
});



// Route to edit consultant account details

app.put('/api/consultants/accounts/:consultantUuid', authenticate, async (req, res) => {
  const { consultantUuid } = req.params;
  const { accountNumber, accountName, bankName } = req.body;

  try {
    // Update the consultant account details in the database
    await db.query(
      'UPDATE consultant_bank_details SET account_number = ?, account_name = ?, bank_name = ? WHERE consultant_uuid = ?',
      [accountNumber, accountName, bankName, consultantUuid]
    );

    res.json({ consultantUuid, accountNumber, accountName, bankName });
  } catch (err) {
    console.error('Error updating consultant account details:', err);
    res.status(500).json({ error: 'Server Error' });
  }
});



// Route to update consultant account details
// Tested and working
app.put('/api/consultants/accounts/:consultant_uuid', authenticate, async (req, res) => {
  try {
    const { consultant_uuid } = req.params;
    const { account_number, account_name, bank_name } = req.body;

    // Check if the consultant account details exist
    const [existingAccount] = await db.query(
      'SELECT * FROM consultant_bank_details WHERE consultant_uuid = ?',
      [consultant_uuid]
    );

    if (existingAccount.length === 0) {
      return res.status(404).json({ error: 'Consultant account details not found' });
    }

    // Update the consultant account details
    await db.query(
      'UPDATE consultant_bank_details SET account_number = ?, account_name = ?, bank_name = ? WHERE consultant_uuid = ?',
      [account_number, account_name, bank_name, consultant_uuid]
    );

    res.json({ message: 'Consultant account details updated successfully' });
  } catch (error) {
    console.error('Error updating consultant account details:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

// Route to delete consultant account details
// Tested and working
app.delete('/api/consultants/accounts/:consultant_uuid', authenticate, async (req, res) => {
  try {
    const { consultant_uuid } = req.params;

    // Delete the consultant account details from the database
    await db.query('DELETE FROM consultant_bank_details WHERE consultant_uuid = ?', [consultant_uuid]);

    res.json({ message: 'Consultant account details deleted successfully' });
  } catch (error) {
    console.error('Error deleting consultant account details:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});


// Route to Add Profile Image
// Create a storage engine for Multer
const storage2 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'public', 'images'));
  },
  filename: function (req, file, cb) {
    // Generate a unique filename for the uploaded image
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extname = path.extname(file.originalname);
    cb(null, uniqueSuffix + extname);
  }
});


// Create an instance of the Multer middleware
const upload2 = multer({
  storage: storage2,
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


// Define the route to handle the image upload 
app.post('/api/profile-image',  upload2.single('image'), authenticate, async (req, res) => {
  try {
    
    const { consultantUuid = '' } = req.body;

    // Retrieve the file path of the uploaded image
    //const imagePath = req.file ? req.file.path : '';
    const imageUrl = req.file ? path.basename(req.file.path) : '';

    await db.query(
      'INSERT INTO consultants_profile_images (consultant_uuid, image_url) VALUES (?, ?)',
      [consultantUuid, imageUrl]
    );

    res.json({ consultantUuid, imageUrl });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});


// Define the route to handle editing the profile image
// Define the route to handle editing the profile image
// Modify the route definition to include the authentication middleware before the upload middleware
app.put('/api/profile-image/:consultantUuid',  upload2.single('image'),
  async (req, res) => {
    try {
      const consultantUuid = req.params.consultantUuid;

      let imageUrl = '';
      if (req.file) {
        // Retrieve the file path of the uploaded image
        imageUrl = path.basename(req.file.path);
      } else {
        // No new image selected, fetch the existing image URL from the database
        const [row] = await db.query('SELECT image_url FROM consultants_profile_images WHERE consultant_uuid = ?', [consultantUuid]);
        imageUrl = row ? row.image_url : '';
      }

      await db.query(
        'UPDATE consultants_profile_images SET image_url = ? WHERE consultant_uuid = ?',
        [imageUrl, consultantUuid]
      );

      res.json({ consultantUuid, imageUrl });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  }
);



// Define the route to handle new listing creation
app.post('/api/create-post',  authenticate, async (req, res) => {
 
  try {
    const propertyUuid = uuidv4();
    const { title = '', description = '', category = '', price = '', city = '', state = '' } = req.body;
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
    // const imagePath = req.file ? req.file.path : '';   

    const result = await db.query(
      'INSERT INTO listings (property_uuid, title, description, category, price, city, state, date_created, date_last_modified, views) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [propertyUuid, title, description, category, price, city, state, dateCreated, dateLastModified, views]
    );
   
    res.json({     
      propertyUuid,
      title,
      description,    
      category,
      price,
      city,
      state,
      dateCreated,
      dateLastModified,
      views
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Define the route to handle editing consultant details 
//Tested with postman and it worked   , city, state, date_created, date_last_modified,
app.put('/api/edit-property/:propertyUuid',  authenticate, async (req, res) => {
  try {
    const propertyUuid = req.params.propertyUuid;
    const { title = '', description = '', category = '', price = '', city = '', state = '' } = req.body;
    const ts = Date.now();
    const date_ob = new Date(ts);
    const date = date_ob.getDate();
    const month = date_ob.getMonth() + 1;
    const year = date_ob.getFullYear();
    const hour = date_ob.getHours();
    const minute = date_ob.getMinutes();
    const seconds = date_ob.getSeconds();
    const dateLastModified = year + '-' + (month < 10 ? '0' + month : month) + '-' + (date < 10 ? '0' + date : date) + ' ' + hour + ':' + minute + '-' + seconds;
    

    await db.query(
      'UPDATE listings SET title = ?, description = ?, category = ?, price = ?, city = ?, state = ?,  date_last_modified = ? WHERE property_uuid = ?',
      [title, description, category, price, city, state, dateLastModified, propertyUuid]
    );

    res.json({
      message: 'Property details updated successfully',
      propertyUuid, title, description, category,  price,  city,  state, dateLastModified  
       });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});


// Define the route to handle the property image upload 
app.post('/api/property-image', upload2.single('image'), async (req, res) => {
  try {
    
    const { propertyUuid = '' } = req.body;

    // Retrieve the file path of the uploaded image
    //const imagePath = req.file ? req.file.path : '';
    const imageUrl = req.file ? path.basename(req.file.path) : '';

    await db.query(
      'INSERT INTO property_profile_images (property_uuid, image_url) VALUES (?, ?)',
      [propertyUuid, imageUrl]
    );

    res.json({ propertyUuid, imageUrl });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Define the route to handle editing the property image
// Define the route to handle editing the property image
app.put('/api/edit-property-image/:propertyUuid', upload2.single('image'),  async (req, res) => {
  try {
    const propertyUuid = req.params.propertyUuid;
    
    let imageUrl = '';
    if (req.file) {
      // Retrieve the file path of the uploaded image
      imageUrl = path.basename(req.file.path);
    } else {
      // No new image selected, fetch the existing image URL from the database
      const [row] = await db.query('SELECT image_url FROM property_profile_images WHERE property_uuid = ?', [propertyUuid]);
      imageUrl = row ? row.image_url : '';
    }

    await db.query(
      'UPDATE property_profile_images SET image_url = ? WHERE property_uuid = ?',
      [imageUrl, propertyUuid]
    );

    res.json({ propertyUuid, imageUrl });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});


// Register the router with your Express app
//app.use('/api', router);



/*===================================CONSULTANT ROUTES====================================== */



//Get Downlines
// Endpoint to retrieve downline
// Update your code to use the executeQuery function

app.get('/api/downline/:sponsorId',  authenticate, async (req, res) => {
  try {
    const { sponsorId } = req.params;

    // Make a database query to retrieve the consultant details
    const query = 'SELECT `fname` AS fullNme, `phone_number` AS phoneNumber, `email` AS email, `username_cid` AS usernameCid, sponsor_cid AS parentId FROM `consultants` WHERE `sponsor_cid` = ?';
    
    // Replace the code below with your actual database query execution code
    // Execute the query using your preferred method (e.g., using a database client like MySQL, PostgreSQL, etc.)
    // and pass the sponsorId as a parameter to prevent SQL injection
    const results = await yourDatabaseClient.executeQuery(query, [sponsorId]);

    // Return the results
    res.json(results);
  } catch (error) {
    console.error('Error retrieving consultant details: ', error);
    res.status(500).json({ error: 'Error retrieving consultant details' });
  }
});



// Register the router with your Express app
//app.use('/api', router);

// Define the route to handle editing a post

app.post('/api/dashboard/edit-post-detail/:articleUuid', upload.single('image'),  authenticate, async (req, res) => {
  const { articleUuid } = req.params;
  const { title, description, category } = req.body;

  try {
    let imagePath = ''; // Variable to store the image path

    // Check if a new image is selected
    if (req.file) {
      imagePath = req.file.filename;
    }

    // Update the article data in the database based on the propertyUuid
/*         await db.query(
      'UPDATE listings SET title = ?, brief_description = ?, description = ?, category = ?, image_path = ? WHERE propertyUuid = ?',
      [title, description, category, imagePath, propertyUuid]
    );  */


    await db.query(
  'UPDATE listings SET title = ?, brief_description = ?, description = ?, category = ?, image_path = ? WHERE propertyUuid = ?',
  [title, description, category, imagePath || null, articleUuid]
); 

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Register the router with your Express app
//app.use('/api', router);


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


  // Error handling middleware for handling JWT errors
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: 'Invalid token' });
  } else {
    res.status(500).json({ error: 'Internal server error' });
  }
});

 const router = express.Router() //For NOW
app.get('*', (req, res) => {
  //res.sendFile(path.join(__dirname, '../dist/index.html'));
  res.sendFile(path.join(__dirname, '../dist/realtor_exp_frontend/index.html'));
}); 
// start the server
app.listen(process.env.PORT || 3000, () => console.log('Server started on port 3000'));