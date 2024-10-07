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

const { uploadSellerAvatar,uploadProductImage } = require('../pages/functions/imageController');
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
  getCategoriesTotalNumber} = require('../pages/functions/category/CategoriesController');
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
  getTotalValue } = require('../pages/functions/product/ProductsController');
const {getAllOrders,
    getTotalSales,
    getOrderTotalNumber} = require('../pages/functions/order/orderController');
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
app.post('/api/products/add', uploadProductImage.single('image'), async (req, res) => {
  await addProduct(req, res);
});

// Route to delete a product by ID
app.delete('/api/products-admin/delete/:productId', deleteProduct);

// 获取产品总数量
app.get('/api/total-products', getProductTotalNumber);

// 获取产品总类目
app.get('/api/total-categories', getCategoriesTotalNumber);

// 获取产品总价值
app.get('/api/total-value', getTotalValue);

// 获取用户总数量
app.get('/api/total-users', getUserTotalNumber);

// 获取一周内增加用户
app.get('/api/new-users', getNewUsers);

// 获取销售总额
app.get('/api/total-sales', getTotalSales);

// 获取订单总数量
app.get('/api/total-orders', getOrderTotalNumber);

// 定义获取销量最高的四个产品的路由
app.get('/api/top-selling-products', getTopSellingProducts);

// Start the server
app.listen(3001, () => {
    console.log('Server started on port 3001');
});
