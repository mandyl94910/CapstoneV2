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
app.post('/api/register', registerFunction);

// Login route
app.post('/api/login', loginFunction);

// Route to get current user information
app.get('/api/getUser', getUserInformation);

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
