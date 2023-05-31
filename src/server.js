import * as admin from 'firebase-admin';
import express from 'express';
import multer from 'multer';
import path from 'path';
import { db } from './database';
import cors from 'cors';
import bodyParser from 'body-parser';
import { v4 as uuidv4 } from 'uuid';

// Initialize Firebase Admin using your service account credentials
const serviceAccount = {
  "type": "service_account",
  "project_id": "realtor-express-squad",
  "private_key_id": "25fe84d364680e4a587ce3018d48e4b9b174b660",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDOtaiclbV/h+Zh\n7Y91w/Z+I4ROLBGZRU+DO0WZwBlPXdzImaI8asY9acI/a29exQurAoVvIQ3Rq8LY\noNsN/n3sbmyrJY19CHJ5D9tsl/aW8N23mb2nR9Gt0gcxTkeVbUn3TDB4Aul4x8zx\n7tx0szXDFF422vODAVobqSz+rL0vkFn9Pibibk8mmcf2uI6Rp8OFKMMhwhXhapl5\n7+NiA5x+IMe25mRGZeMIMSIqixkvgWPoOR+W24Y7FYyd39xusb0bMHaa/6doJREQ\ncUl8bNu4hNHph9/PBbxAs7NKSsQJTZEJBlVPYDG50uIWvHwvC99u8cDRIGOq9qE5\nINFvIySVAgMBAAECggEAKAV+d5C50w8MITY2UjIGib4VKfB42NDVV/50F5RcoiP1\ncQZj5agzqSTOlepWZgYnH+1NSeqfqxKDF1+vgdpd5ZaspgdPiV+HEF7sWC5k8S0B\n9IAI+vgaBfo158s06169VSrUcIv5yad/i/D4EIU5GcPaCOtj/d+XY2ciHc3ylCBY\njlCKe1FvV7st1pY0bytluOdBHw2zNBqLzxTZNvHlCVtoq6Imelc3MuIkENEM9JFK\natiT76huoYxQuEnVWuUUQR0w94VymZzdptlr008FpUnsvIP6CostGa3VppD1eeCV\nu7113Pznrs3KOL//LU1S7joZk7r+pvJWAi52onIRmQKBgQD64HAvSzkCSZfYj0kk\nAnrPrkyjLScQluqH3Hv2aIBMk4Ywp2krn7Pn7Ql3QzZCfkB3YGTpAn3JaA5Voghu\nx9xFVtO32SkFW1Op8/dXni5KFDQYlDG42YZETUJjoZ5q6mYc69NPI/XudF7JLdkJ\n9S6xwZ6wRtoYekwdVyH6L+C6/QKBgQDS7lGPWPLhNuDTdfsUZylDOSZMjAFHgBnk\neu9G4AoS5WJ05xyelQ7eDn48a1I9mXT03Dj5KoOHwOL2394IaYb/corQXbCPRpNe\nSk7oQUc4UwhPHxSpbrzA2jrTdh8maxcOGdYRsiAj38467K/mTxk4etw5xFAFRgrH\nGLyfvIi/eQKBgCm1xvEWAJRwx94pdG+YOfLtd7BpgWUwsi2Eate86BfTLyxHqSSn\nmLGmpzw84HiNpQoz7JMQ5vjlY/y4w84nTGf615hpcniBhpdrCGR42BlY4pBzkxC4\nmaohbjhCVqRP9Eo6qxctU2Yh0uB/zuXo7aqAFnIYVYpcSutV4UBHVYXBAoGAYyBq\npfJIWjzfFaF5eJIumw/thsW5CDAUewKnFmjNcynnxkaidYhZb1PiUWSiRp6qjzQ7\ndiVboN2uDBUTFGL7dWsP/3I4Om0Rbpt/T7j1zmt/GSfjHukSvZMRWDVH2Fc1g4Py\nzWgnoJRaJ+j5lUOQ97ENc/xlGsVa5UwjwPHqVgkCgYANkAhuBKHRzQJCKgBV9eNT\nexAs8Fa3mtZJUgIxqNV8eozxAD37AMWlkyIOc8j7wMWkmteGGoISMZKwavMTQicg\nA7CcYthcOnMFMadDgz1kzz2RGI0uHeGsM6bLENBlEvNLQIRlEDyAYgE9d5Hrzito\nrV4wXvfYhZvMONw7VnQB/Q==\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-yipa9@realtor-express-squad.iam.gserviceaccount.com",
  "client_id": "102066519701717826601",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-yipa9%40realtor-express-squad.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
};
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // databaseURL: 'https://your-project-id.firebaseio.com' // Replace with your Firebase project's database URL
});

// Use Firebase Admin in your Express routes and middleware
const app = express();

// Serve static files from the public/images directory

// Initialize Firebase Admin using your service account credentials




// Serve static files from the public/images directory
app.use(express.static(path.join(__dirname, 'public/images')));

app.use(cors());
app.use(bodyParser.json());


 
// route to select all listings
app.get('/api/listings', async (req, res) => {
  try {
    const query = 'SELECT * FROM listings';
    const [rows, fields] = await db.query(query);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'No listings in the database' });
    }

    const listings = rows.map((row) => {
      return {
        id: row.id,
        propertyUuid: row.property_uuid,
        title: row.title,
        description: row.description,
        imagePath: row.image_path,
        category: row.category,
        price: row.price,
        dateCreated: row.date_created,
        dateLastModified: row.date_last_modified,
        views: row.views
      };
    });

    res.json(listings); // Send the listings as JSON in the response body
  } catch (error) {
    console.error('Error fetching listings data from the database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// Route to get listing detail by propertyUuid
app.get('/api/listing/:propertyUuid', async (req, res) => {
  try {
    const propertyUuid = req.params.propertyUuid || null; // Provide a default value of null if id is not available
    const query = 'SELECT title, description, date_created, image_path, category FROM listings WHERE property_uuid = ? LIMIT 1';

    const [rows, fields] = await db.query(query, [propertyUuid]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Listing not found' });
    }

    const { title, description, date_created, category, image_path } = rows[0];
    const listingData = {
      title,
      description,
      date_created,      
      category,
      image_path
    };
    
    res.json(listingData); // Send listingData in the response JSON
  } catch (error) {
    console.error('Error fetching article data from the database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// route to select all listings for Admin
app.get('/api/dashboard/posts', async (req, res) => {
    try {
      const [rows, fields] = await db.query('SELECT * FROM listings ORDER BY id  DESC');
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  });


// route to select listings by category
app.get('/api/dashboard/post/:category', async (req, res) => {
  try {
    const [rows, fields] = await db.query('SELECT * FROM listings WHERE category = ?', [req.params.category]);
    res.json(rows);
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
    //const imagePath = req.file ? req.file.path : '';
    const imagePath = req.file ? path.basename(req.file.path) : '';

    await db.query(
      'INSERT INTO listings (propertyUuid, auuid, title, description, image_path, category, date_created, date_last_modified, views) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [articleUuid, auuId, title, description, imagePath, category, dateCreated, dateLastModified, views]
    );

    res.json({
      articleUuid,
      auuId,
      title,
      brief_description,
      description,
      //imagePath,
      imagePath,   //: 'assets/' + imagePath,
      //imagePath: req.protocol + '://' + req.get('host') + '/assets/' + imagePath,
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


// Define the route to select a consultant based on consultant_uuid
//  Tested and is working
router.get('/consultants/:consultantUuid', async (req, res) => {
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

router.get('/consultants', async (req, res) => {
  try {
    const [consultants] = await db.query('SELECT * FROM consultants');
    res.json(consultants);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Define the route to handle Signup
// Tested with postman and it worked
router.post('/consultants/add-signup', async (req, res) => {
  try {
    const {  phoneNumber = '' } = req.body;

    // Check if phone number already exists
    const [existingConsultant] = await db.query('SELECT * FROM consultants WHERE phone_number = ?', [phoneNumber]);
    if (existingConsultant.length > 0) {
      return res.status(400).json({ error: 'User with this phone number already exists' });
    }

    const consultantUuid = uuidv4();
    const { fname = '', email = '', sponsorCid = '', dateBirth = '', gender = '', address = '', city = '', state = '',  country = '', } = req.body;
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

    const [sponsor] = await db.query('SELECT rank, team_id FROM consultants WHERE sponsor_cid = ?', [sponsorCid]);
    const sponsorRank = sponsor && sponsor.length > 0 ? parseInt(sponsor[0].rank) : 0;    
    const sponsorTeamId = sponsor && sponsor.length > 0 ? sponsor[0].team_id : 0;
    const rank = sponsorRank + 1;
    const teamId = sponsorTeamId;
    const totalSales = 0;
    const totalEarnings = 0;

    await db.query(
      'INSERT INTO consultants (consultant_uuid, fname, phone_number, email, username_cid, sponsor_cid, registration_date, date_birth, gender, address, city, state, country, team_id, rank, total_sales, total_earnings) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        consultantUuid, fname, phoneNumber, email, usernameCid, sponsorCid, registrationDate, dateBirth, gender, address, city, state, country, teamId, rank, totalSales, totalEarnings,
      ]
    );

    res.json({
      consultantUuid, fname, phoneNumber, email, usernameCid, sponsorCid, registrationDate, dateBirth, gender, address,  city, state, country, teamId,  rank, totalSales, totalEarnings,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});


// Register the router with your Express app

app.use('/api', router);

// Define the route to handle editing consultant details 
//Tested with postman and it worked
router.put('/consultants/:consultantUuid', async (req, res) => {
  try {
    const consultantUuid = req.params.consultantUuid;
    const { fname = '', phoneNumber = '', email = '', sponsorCid = '', dateBirth = '', gender = '', address = '', city = '', state = '', country = '' } = req.body;
    const usernameCid = 'req' + phoneNumber;

    const [sponsor] = await db.query('SELECT rank, team_id FROM consultants WHERE consultant_uuid = ?', [sponsorCid]);
    const sponsorRank = sponsor && sponsor.length > 0 ? sponsor[0].rank : 0;
    const sponsorTeamId = sponsor && sponsor.length > 0 ? sponsor[0].team_id : 0;
    const rank = sponsorRank + 1;
    const teamId = sponsorTeamId;

    await db.query(
      'UPDATE consultants SET fname = ?, phone_number = ?, email = ?, username_cid = ?, sponsor_cid = ?, date_birth = ?, gender = ?, address = ?, city = ?, state = ?, country = ? WHERE consultant_uuid = ?',
      [fname, phoneNumber, email, usernameCid, sponsorCid, dateBirth, gender, address, city, state, country, consultantUuid]
    );

    res.json({
      message: 'Consultant details updated successfully',
      consultantUuid,
      fname,
      phoneNumber,
      email,
      usernameCid,
      sponsorCid,
      dateBirth,
      gender,
      address,
      city,
      state,
      country,
      teamId,
      rank
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Register the router with your Express app
app.use('/api', router);



// Define the route to delete a consultant based on consultant_uuid
//Tested with postman and it worked
router.delete('/consultants/:consultantUuid', async (req, res) => {
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
app.post('/api/consultants/accounts', async (req, res) => {
  try {
    // Extract the request body data
    const { consultant_uuid, account_number, account_name, bank_name } = req.body;

    // Insert the consultant account details into the database
    await db.query(
      'INSERT INTO consultant_bank_details (consultant_uuid, account_number, account_name, bank_name) VALUES (?, ?, ?, ?)',
      [consultant_uuid, account_number, account_name, bank_name]
    );

    res.status(201).json({ message: 'Consultant account details inserted successfully' });
  } catch (err) {
    console.error('Error inserting consultant account details:', err);
    res.status(500).json({ error: 'Server Error' });
  }
});

// Route  to select consultant account details:
// working
app.get('/api/consultants/accounts/:consultant_uuid', async (req, res) => {
  try {
    const { consultant_uuid } = req.params;

    // Retrieve the consultant account details from the database
    const [results] = await db.query('SELECT * FROM consultant_bank_details WHERE consultant_uuid = ?', [consultant_uuid]);

    if (results.length === 0) {
      res.status(404).json({ error: 'Consultant account details not found' });
      return;
    }

    res.json(results);
  } catch (err) {
    console.error('Error retrieving consultant account details:', err);
    res.status(500).json({ error: 'Server Error' });
  }
});


// Route to update consultant account details
// Tested and working
app.put('/api/consultants/accounts/:consultant_uuid', async (req, res) => {
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
app.delete('/api/consultants/accounts/:consultant_uuid', async (req, res) => {
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


// Register the router with your Express app
app.use('/api', router);

// Define the route to handle editing a post

router.post('/dashboard/edit-post-detail/:articleUuid', upload.single('image'), async (req, res) => {
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
app.use('/api', router);


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
      await db.query('DELETE FROM listings WHERE propertyUuid=?', [articleUuid]);
      res.json({ message: 'Post deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  });
  

// start the server
app.listen(3000, () => console.log('Server started on port 3000'));