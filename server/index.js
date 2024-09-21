// C:\CPRG306\CapstoneV1\server\index.js
const axios = require('axios'); 
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');

require('./passportConfig')(passport); // Correctly import passportConfig.js
const { loginFunction, registerFunction,getUserInformation } = require('../pages/functions/user/AccountController');
const { getCategories } = require('../pages/functions/category/CategoriesController');
const { getAllProducts,getAllProductsForDataTable, getProductsByCategory, getProductById } = require('../pages/functions/product/ProductsController');

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

// Start the server
app.listen(3001, () => {
    console.log('Server started on port 3001');
});
