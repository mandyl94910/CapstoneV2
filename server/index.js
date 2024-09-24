// C:\CPRG306\CapstoneV1\server\index.js
const axios = require('axios'); 
const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs'); 
const passport = require('passport');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const events = require('events');
events.EventEmitter.defaultMaxListeners = 20; // Set to a higher value for listening to more router

require('./passportConfig')(passport); // Correctly import passportConfig.js
const { loginFunction, registerFunction,getUserInformation } = require('../pages/functions/user/AccountController');
const { getAdminInformation,updateAdminDetails,changeCredentials  } = require('../pages/functions/user/AdminController');
const { getCategories } = require('../pages/functions/category/CategoriesController');
const { getAllProducts,getAllProductsForDataTable, getProductsByCategory, getProductById } = require('../pages/functions/product/ProductsController');
const searchProductsByName = require('../pages/functions/product/search');

const app = express();

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession({ secret: 'mySecretKey', resave: false, saveUninitialized: false }));
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(cookieParser('mySecretKey'));
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);  // Initialize Passport for authentication

//followings are from <chatgpt>
//Multer is a middleware usually used for uploading files. 
//It parses the request for multipart/form-data data, 
//which is a common encoding type used when uploading files.
//Storage Management: It provides a variety of storage options, 
//including in-memory storage and disk storage. 
//You can choose to store uploaded files in the server's memory or directly to disk.
//We'll use multer to store photos, etc. for now. In the future we plan to use cloud storage.
//Configuring multer storage
const storage = multer.diskStorage({
    //This initializes the storage engine for Multer, 
    //specifically defining how and where to store the uploaded files. 
    //It uses the diskStorage method to store files on the disk.
    destination: (req, file, cb) => {
      //Used to determine the directory where the uploaded file is saved. 
      //Contains the “HTTP request object req”, the “uploaded file object file”, and the callback function “cb”.  
      const dir = './public/images/admin';
      //If the directory does not exist, it will be created next.
      if (!fs.existsSync(dir)){
        //The mkdirSync() method synchronizes the creation of the directory
        fs.mkdirSync(dir, { recursive: true });
      }
      //Passes the destination directory dir as the second 
    //argument, and null as the first argument to indicate that 
    //there is no error.Multer uses this callback to indicate 
    //that the file should be saved to the specified directory.
      cb(null, dir);
    },
    //Decide how uploaded files should be named
    filename: (req, file, cb) => {
      const adminId = req.body.adminId;  
      const filename = `${adminId}.webp`;
      cb(null, filename);
    }
  });
//Initialize the Multer with the configured storage object. 
//the Multer will now handle file uploads based on the storage 
//rules defined earlier, specifically how files are saved and how they are named.
const upload = multer({ storage: storage });

// Registration route
app.post('/register', async (req, res) => {
  const { username, password, email, phone, recaptchaToken } = req.body;

  const recaptchaResult = await verifyRecaptchaToken(recaptchaToken);
  if (!recaptchaResult.isValid) {
      return res.status(400).send({ message: recaptchaResult.message });
    }
  try {
    // Check for username or email in Redis cache
    const cachedUsername = await redisClient.get(`username_${username}`);
    const cachedEmail = await redisClient.get(`email_${email}`);

    if (cachedUsername) {
      return res.status(400).send({ message: "Username already exists (cached)" });
    }
    if (cachedEmail) {
      return res.status(400).send({ message: "Email already registered (cached)" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const query = "SELECT customer_name, email FROM customer WHERE customer_name = $1 OR email = $2";

    db.query(query, [username, email], (err, result) => {
      if (err) {
        return res.status(500).send('Database error');
      }
      if (result.rows.some(row => row.customer_name === username)) {
        // Cache the username with an expiration
        redisClient.set(`username_${username}`, 'true', 'EX', 10 * 800); // Cache for 1 hour
        return res.status(400).send({ message: "Username already exists" });
      }
      if (result.rows.some(row => row.email === email)) {
        // Cache the email with an expiration
        redisClient.set(`email_${email}`, 'true', 'EX', 10 * 800); // Cache for 1 hour
        return res.status(400).send({ message: "Email already registered" });
      }

      // Insert new user
      const insertQuery = "INSERT INTO customer (customer_name, password, email, phone) VALUES ($1, $2, $3, $4)";
      db.query(insertQuery, [username, hashedPassword, email, phone], (err, result) => {
        if (err) {
          return res.status(500).send('Database insertion error');
        }
        res.send({ message: "User created" });
      });
    });
  } catch (error) {
    return res.status(500).send('Unexpected server error');
  }
});


// Login route
app.post('/login', async (req, res, next) => {
  const { recaptchaToken, loginIdentifier, password } = req.body;
  if (!loginIdentifier || !password) {
    return res.status(400).send({ message: "Missing credentials" });
  }

  const recaptchaResult = await verifyRecaptchaToken(recaptchaToken);
  if (!recaptchaResult.isValid) {
    return res.status(400).send({ message: recaptchaResult.message });
  }

  // Determine if the identifier is an email or username
  const isEmail = loginIdentifier.includes('@');
  const searchCriteria = isEmail ? { email: loginIdentifier } : { username: loginIdentifier };

  // Use Passport to authenticate the user
  passport.authenticate('local', searchCriteria, (err, user, info) => {
      if (err) {
          console.error(err);
          return res.status(500).send('Authentication error');
      }
      if (!user) {
          redisClient.incr(`login_attempts_${loginIdentifier}`);
          redisClient.expire(`login_attempts_${loginIdentifier}`, 300);
          return res.status(400).send({ success: false, message: info.message || 'Login failed' });
      }

      req.logIn(user, async (err) => {
          if (err) {
              console.error(err);
              return res.status(500).send('Login error');
          }

          // Clear login attempts from Redis and cache the session
          redisClient.del(`login_attempts_${loginIdentifier}`);

          const sessionData = { id: user.customer_id, username: user.customer_name };
          await redisClient.set(`session_${user.customer_id}`, JSON.stringify(sessionData), 'EX', 10800);  // Cache for 3 hours
          res.send({ success: true, message: 'User logged in' });
      });
  })(req, res, next);
});

// Route to get current user information
app.get('/getUser', async (req, res) => {
  if (!req.user) {
    return res.status(401).send('Not authenticated');
  }

  try {
    const sessionKey = `session_${req.user.customer_id}`;
    const cachedSession = await redisClient.get(sessionKey);
    if (cachedSession) {
      const parsedSession = JSON.parse(cachedSession);
      return res.send(parsedSession);
    } else {
      // Cache the session if not already cached
      await redisClient.set(sessionKey, JSON.stringify(req.user), 'EX', 10800); // Cache for 3 hours
      res.send(req.user);
    }
  } catch (error) {
    return res.status(500).send('Error retrieving user session');
  }
});

// Route to get all categories
app.get('/api/categories', getCategories);

// Get all products
app.get('/api/products', getAllProducts);

// Get all products for admin
app.get('/api/products-admin/datatable', getAllProductsForDataTable);

// Get products by category
app.get('/api/products/category/:categoryId', getProductsByCategory);

// Route to get a single product by ID
app.get('/api/products/:productId', getProductById);

// Define routes to handle /api/products search requests
app.get('/api/productsName', searchProductsByName);

// Route to get admin information
app.get('/api/profile-admin', getAdminInformation);

// 路由配置
app.post('/api/update-admin', upload.single('profilePicture'), updateAdminDetails);


// 路由配置
app.post('/api/changeCredentials', changeCredentials);

// Start the server
app.listen(3001, () => {
    console.log('Server started on port 3001');
});
