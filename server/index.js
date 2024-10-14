// C:\CPRG306\CapstoneV1\server\index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const events = require('events');
events.EventEmitter.defaultMaxListeners = 20; // Set to a higher value for listening to more router

const { uploadSellerAvatar,uploadProductImage,updateProductImage } = require('../pages/functions/imageController');
require('./passportConfig')(passport); // Correctly import passportConfig.js
const { loginFunction, 
  registerFunction, 
  getUserInformation,
  getAllUsers,
  getUserTotalNumber,
  getNewUsers } = require('../pages/functions/user/AccountController');
const { getAdminInformation, 
  updateAdminDetails, 
  changeCredentials  } = require('../pages/functions/user/AdminController');
const { getCategories, 
  getPrimaryCategories,
  getSubCategories,
  getCategoriesTotalNumber,
  getCategoryById} = require('../pages/functions/category/CategoriesController');
const { getAllProducts, 
  getAllProductsForDataTable, 
  getProductsByCategory, 
  getProductById, 
  getRecommendedProducts, 
  getProductsByCategoryIncludeSubcategory,
  changeProductVisibility,
  addProduct,
  deleteProduct,
  getProductTotalNumber,
  getTopSellingProducts,
  getTotalValue,
  nameProductImages,
  updateProductById } = require('../pages/functions/product/ProductsController');
const {getAllOrders,
    getTotalSales,
    getOrderTotalNumber} = require('../pages/functions/order/orderController');
const searchProductsByName = require('../pages/functions/product/search');
const getReviewByProductId = require('../pages/functions/product/review');

const { getAddresses, deleteAddress } = require('../pages/functions/user/address');
const { getSalesReportData } = require('../pages/functions/report/SalesReportController');


const app = express();

// Middleware setup
//Middleware in Express is a function used to process requests and responses, acting between receiving the request and sending the final response.
// Middleware functions can modify, validate, or process data during a request’s lifecycle. 
//They play a central role in Express, enabling chained processing of requests, 
//where each middleware performs specific tasks before passing control to the next one.

//This middleware parses incoming request bodies in JSON format, making the parsed data available on req.body.
app.use(bodyParser.json());
//This middleware parses incoming request bodies with URL-encoded data. When { extended: true } is set, like "name=John&age=30"
app.use(bodyParser.urlencoded({ extended: true }));
//expressSession manages user sessions by creating a unique session for each user and storing it on the server.
//High performance because only the sessionID is passed
//High data consistency, updated in real time
app.use(expressSession({ secret: 'mySecretKey', resave: false, saveUninitialized: false }));
//CORS (Cross-Origin Resource Sharing) middleware allows your server to handle requests from different origins.
//origin: Restricts access to requests coming from http://localhost:3000.
//credentials: true: Enables cross-origin requests to include credentials, like cookies, with the request.
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
//Enabling you to read and use cookie data on req.cookies.
//The 'mySecretKey' argument signs cookies to protect against tampering.
app.use(cookieParser('mySecretKey'));
//Sets up Passport to manage authentication workflows like logging in and registering users.
//Passport is an authentication middleware for Node.js applications
app.use(passport.initialize());
//Allows Passport to manage persistent login sessions, so users remain logged in even after refreshing or navigating to different pages.
//Works with expressSession to store user data in the session.
app.use(passport.session());

app.use('/images', express.static('public/images'));

require("./passportConfig")(passport);  // Initialize Passport for authentication

// Registration route
app.post('/api/register', registerFunction);

// Login route
app.post('/api/login', loginFunction);

// Route to get current user information
app.get('/api/getUser', getUserInformation);

// Get addresses by customer id
app.get('/api/addresses/:customerId', getAddresses);

// Delete address by address id
app.delete('/api/address/delete/:addressId', deleteAddress);

// Route to get all categories
app.get('/api/categories', getCategories);

// Get all products
app.get('/api/products', getAllProducts);

// Get reviews
app.get('/api/reviews/:productId', getReviewByProductId);

// Get all products for admin
app.get('/api/products-admin/datatable', getAllProductsForDataTable);

// Get products by category and its subcategories
app.get('/api/products/categories/:categoryId', getProductsByCategoryIncludeSubcategory);

// Get products by category
app.get('/api/products/category/:categoryId', getProductsByCategory);

// Get products by parent category(only sub_for 1)
app.get('/api/categories_sub_for_1', getPrimaryCategories);

// Route to get some recommended products--price range
app.get('/api/products/recommended_products', getRecommendedProducts);

// Route to get a single product by ID
app.get('/api/products/:productId', getProductById);

// Define routes to handle /api/products search requests
app.get('/api/productsName', searchProductsByName);

// Route to get admin information
app.get('/api/profile-admin', getAdminInformation);

//Handles POST request to update an admin's details, including uploading a single profile picture using multer middleware.
app.post('/api/update-admin', uploadSellerAvatar.single('profilePicture'), updateAdminDetails);


// Handles POST request to change credentials for a user or admin.
app.post('/api/changeCredentials', changeCredentials);

// Handles POST request to change the visibility status of a product in the admin's product management system.
app.post('/api/products-admin/changeVisibility',changeProductVisibility);

// Route to get users
app.get('/api/user-admin/datatable', (req, res) => {
  getAllUsers(req, res);
});

// Route to get order
app.get('/api/order-admin/datatable', (req, res) => {
  getAllOrders(req, res);
});

// Route to get Sub Categories
app.get('/api/subcategories', getSubCategories);

// Product Image Upload Routing
app.post('/api/products/add', addProduct);

// Product update Routing
app.put('/api/products/:productId', 
  updateProductImage.array('images', 4), 
  function(req, res, next) {
    console.log('Files after upload:', req.files);
    next();
  },
  updateProductById);

// POST /api/products/:productId/upload
app.post('/api/products/:productId/uploadProductImage', uploadProductImage.array('images', 4), nameProductImages);

// Route to delete a product by ID
app.delete('/api/products-admin/delete/:productId', deleteProduct);

// Get the total number of products
app.get('/api/total-products', getProductTotalNumber);

// Get the total number of product categories
app.get('/api/total-categories', getCategoriesTotalNumber);

// Capture the total value of the product
app.get('/api/total-value', getTotalValue);

// Get the total number of users
app.get('/api/total-users', getUserTotalNumber);

// 获取一周内增加用户
app.get('/api/new-users', getNewUsers);

// 获取销售总额
app.get('/api/total-sales', getTotalSales);

// 获取订单总数量
app.get('/api/total-orders', getOrderTotalNumber);

// 定义获取销量最高的四个产品的路由
app.get('/api/top-selling-products', getTopSellingProducts);

// Sales report route
app.get('/api/sales-report', getSalesReportData);

// Route to get a category by ID
app.get('/api/categories/:id', getCategoryById);

// Start the server
app.listen(3001, () => {
    console.log('Server started on port 3001');
});
