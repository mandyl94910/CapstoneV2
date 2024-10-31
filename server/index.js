// C:\CPRG306\CapstoneV1\server\index.js
const express = require("express");
const passport = require("passport");
require("./passportConfig")(passport); 

const bodyParser = require("body-parser");
const cors = require("cors");
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const events = require("events");

events.EventEmitter.defaultMaxListeners = 20; // Set to a higher value for listening to more router
const { createPaymentIntent } = require("./services/paymentService"); // 서비스 로직 불러오기
const helmet = require("helmet");
// To use info from .env.local
const dotenv = require("dotenv");
dotenv.config();

const {
  uploadSellerAvatar,
  uploadProductImage,
  updateProductImage,
} = require("../pages/functions/imageController");

const {
  loginFunction,
  registerFunction,
  getUserInformation,
  getAllUsers,
  getUserTotalNumber,
  getNewUsers,
  verifyEmail,
  sendResetPasswordEmail,
  resetPassword,
  loginByEmail 
} = require("../pages/functions/user/AccountController");
const {
  getAdminInformation,
  updateAdminDetails,
  changeCredentials,
} = require("../pages/functions/user/AdminController");
const {
  getCategories,
  getPrimaryCategories,
  getSubCategories,
  getCategoriesTotalNumber,
  getCategoryById,
} = require("../pages/functions/category/CategoriesController");
const {
  getAllProducts,
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
    getOrderTotalNumber,
    getOrderById,
    updateOrderById,
    updateOrderStatus,
    getOrderProducts, 
    getAllOrdersByCustomerId,
    createOrder,
    getOrderDetailByOrderId} = require('../pages/functions/order/orderController');

const searchProductsByName = require('../pages/functions/product/search');
const {getReviewByProductId, 
  addReview, 
  checkReviewStatus} = require('../pages/functions/product/review');
const { getAddresses, deleteAddress, addAddress, updateAddress } = require('../pages/functions/user/AddressController');

const { 
  getSalesReportData, 
  getOrdersSummary } = require('../pages/functions/report/ReportController');

const { generateProductExcel,generateOrderExcel,generateUserExcel  } = require('../pages/functions/data/excelController');

const { 
  getUPSOrderStatus, 
  getFedExOrderStatus, 
  getDHLOrderStatus, 
  getCanadaPostOrderStatus 
} = require('../pages/functions/ShippingService');

const app = express();

// Middleware setup
//Middleware in Express is a function used to process requests and responses, acting between receiving the request and sending the final response.
// Middleware functions can modify, validate, or process data during a request’s lifecycle.
//They play a central role in Express, enabling chained processing of requests,

//expressSession manages user sessions by creating a unique session for each user and storing it on the server.
//High performance because only the sessionID is passed
//High data consistency, updated in real time
app.use(
  expressSession({
    secret: "mySecretKey",
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, secure: false },
  })
);

//Sets up Passport to manage authentication workflows like logging in and registering users.
//Passport is an authentication middleware for Node.js applications
app.use(passport.initialize());
//Allows Passport to manage persistent login sessions, so users remain logged in even after refreshing or navigating to different pages.
//Works with expressSession to store user data in the session.
app.use(passport.session());
//where each middleware performs specific tasks before passing control to the next one.
app.use(express.json());
//This middleware parses incoming request bodies in JSON format, making the parsed data available on req.body.
app.use(bodyParser.json());
//This middleware parses incoming request bodies with URL-encoded data. When { extended: true } is set, like "name=John&age=30"
app.use(bodyParser.urlencoded({ extended: true }));

//CORS (Cross-Origin Resource Sharing) middleware allows your server to handle requests from different origins.
//origin: Restricts access to requests coming from http://localhost:3000.
//credentials: true: Enables cross-origin requests to include credentials, like cookies, with the request.
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
//Enabling you to read and use cookie data on req.cookies.
//The 'mySecretKey' argument signs cookies to protect against tampering.
app.use(cookieParser("mySecretKey"));

app.use("/images", express.static("public/images"));

// Middleware to set security headers using Helmet
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"], // Only allow resources from the same origin
        scriptSrc: [
          "'self'", // Allow scripts from the same origin
          "https://js.stripe.com", // Allow scripts from Stripe's JavaScript library
          "https://m.stripe.network", // Allow scripts from Stripe's network
        ],
        frameSrc: [
          "'self'", // Allow frames from the same origin
          "https://js.stripe.com", // Allow frames from Stripe's JavaScript library
          "https://m.stripe.network", // Allow frames from Stripe's network
        ],
        connectSrc: ["'self'", "https://api.stripe.com"], // Allow connections to the Stripe API
      },
    },
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

//app.js is the parent route, router.post is the child route, 
//you can aggregate many router.posts together modularly, and then use app.use to call all the routes of this module

// Registration route
app.post("/api/register", registerFunction);

// Login route
app.post("/api/login", loginFunction);

// Route to get current user information
app.get("/api/getUser", getUserInformation);

// Get addresses by customer id
app.get("/api/addresses/:customerId", getAddresses);

// Update address by address id
app.put("/api/addresses/:addressId", updateAddress);

// Delete address by address id
app.delete("/api/address/delete/:addressId", deleteAddress);

// Add a new address
app.post("/api/address/add", addAddress);

// Route to get all categories
app.get("/api/categories", getCategories);

// Get all products
app.get("/api/products", getAllProducts);

// Get reviews
app.get("/api/reviews/:productId", getReviewByProductId);

// Add review
app.post('/api/reviews/add', addReview);

// Check if a product within an order being reviewed or not
app.get('/api/review/check', checkReviewStatus);

// Get all products for admin
app.get("/api/products-admin/datatable", getAllProductsForDataTable);

// Get products by category and its subcategories
app.get(
  "/api/products/categories/:categoryId",
  getProductsByCategoryIncludeSubcategory
);

// Get products by category
app.get("/api/products/category/:categoryId", getProductsByCategory);

// Get products by parent category(only sub_for 1)
app.get("/api/categories_sub_for_1", getPrimaryCategories);

// Route to get some recommended products--price range
app.get("/api/products/recommended_products", getRecommendedProducts);

// Route to get a single product by ID
app.get("/api/products/:productId", getProductById);

// Define routes to handle /api/products search requests
app.get("/api/productsName", searchProductsByName);

// Route to get admin information
app.get("/api/profile-admin", getAdminInformation);

//Handles POST request to update an admin's details, including uploading a single profile picture using multer middleware.
app.post(
  "/api/update-admin",
  uploadSellerAvatar.single("profilePicture"),
  updateAdminDetails
);

// Handles POST request to change credentials for a user or admin.
app.post("/api/changeCredentials", changeCredentials);

// Handles POST request to change the visibility status of a product in the admin's product management system.
app.post("/api/products-admin/changeVisibility", changeProductVisibility);

// Route to get users
app.get("/api/user-admin/datatable", (req, res) => {
  getAllUsers(req, res);
});

// Route to get orders for customer
app.get('/api/orders/customer/:customerId', getAllOrdersByCustomerId);

// Route to get order details for one specific order
app.get('/api/order/order-detail/:orderId', getOrderDetailByOrderId);

// Route to update order shipping status based on order Id
app.put('/api/order/:orderId/ship', updateOrderStatus);

// Route to get order
app.get("/api/order-admin/datatable", (req, res) => {
  getAllOrders(req, res);
});

// Route to get Sub Categories
app.get("/api/subcategories", getSubCategories);

// Product Image Upload Routing
app.post("/api/products/add", addProduct);

// Product update Routing
app.put(
  "/api/products/:productId",
  updateProductImage.array("images", 4),
  function (req, res, next) {
    console.log("Files after upload:", req.files);
    next();
  },
  updateProductById
);

// POST /api/products/:productId/upload
app.post(
  "/api/products/:productId/uploadProductImage",
  uploadProductImage.array("images", 4),
  nameProductImages
);

// Route to delete a product by ID
app.delete("/api/products-admin/delete/:productId", deleteProduct);

// Get the total number of products
app.get("/api/total-products", getProductTotalNumber);

// Get the total number of product categories
app.get("/api/total-categories", getCategoriesTotalNumber);

// Capture the total value of the product
app.get("/api/total-value", getTotalValue);

// Get the total number of users
app.get("/api/total-users", getUserTotalNumber);


// Get additional users in a week
app.get('/api/new-users', getNewUsers);

// Get total sales
app.get('/api/total-sales', getTotalSales);

// Get the total number of orders
app.get('/api/total-orders', getOrderTotalNumber);

// Define the route to get the top four selling products
app.get('/api/top-selling-products', getTopSellingProducts);

// Sales report route
app.get("/api/sales-report", getSalesReportData);
app.get('/api/orders-summary', getOrdersSummary);

// Route to get a category by ID
app.get("/api/categories/:id", getCategoryById);

// Endpoint for creating a payment intent
app.post("/api/payment/create-payment-intent", async (req, res) => {
  console.log("Request Body:", req.body); // Log the request body

  const { amount, currency } = req.body; // Extract the amount and currency from the request body

  try {
    // Create Payment Intent
    const { clientSecret } = await createPaymentIntent(amount, currency);
    res.status(200).json({ clientSecret }); // Respond with the client secret for the payment intent
  } catch (error) {
    console.error("Error creating payment intent:", error); // Log any error that occurs during payment intent creation
    res.status(500).json({ error: error.message }); // Respond with an error message if the payment intent creation fails
  }
});

// Create a route for exporting to Excel
app.get('/api/export-products', generateProductExcel);

// Create a route for exporting to Excel
app.get('/api/export-orders', generateOrderExcel );

// Create a route for exporting to Excel
app.get('/api/export-users', generateUserExcel );

// Define the route to get the order
app.get('/api/get-orders-for-admin/:orderId', getOrderById);

// Define routes for modifying orders
app.put('/api/update-orders/:orderId', updateOrderById );

// Get product information for an order
app.get('/api/orders/:orderId/products', getOrderProducts);

// Create an order
app.post('/api/create-orders', createOrder);

// Verify email
app.post('/api/verify-email', verifyEmail);

// Send mail
app.post('/api/send-reset-password-email', sendResetPasswordEmail);

// Update password
app.post('/api/reset-password', resetPassword );

app.post('/api/loginByEmail', (req, res, next) => loginByEmail(req, res, next, passport));

// 定义物流追踪状态的 API 路由
app.get('/api/shipping/status', async (req, res) => {
  const { tracking_number, shipping_method } = req.query;

  try {
    let trackingInfo;

    switch (shipping_method) {
      case 'UPS':
        trackingInfo = await getUPSOrderStatus(tracking_number);
        break;
      case 'FedEx':
        trackingInfo = await getFedExOrderStatus(tracking_number);
        break;
      case 'DHL':
        trackingInfo = await getDHLOrderStatus(tracking_number);
        break;
      case 'Canada Post':
        trackingInfo = await getCanadaPostOrderStatus(tracking_number);
        break;
      default:
        return res.status(400).json({ message: 'Unsupported shipping method' });
    }

    res.json(trackingInfo);
  } catch (error) {
    console.error('Error fetching tracking data:', error);
    res.status(500).json({ message: 'Error fetching tracking data' });
  }
});

// Start the server
app.listen(3001, () => {
  console.log("Server started on port 3001");
});
