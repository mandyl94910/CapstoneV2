// C:\CPRG306\CapstoneV1\server\index.js
const axios = require('axios'); 
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const db = require('./db');
require('./passportConfig')(passport); // Correctly import passportConfig.js
const { getCategories } = require('../pages/api/category/CategoriesController');
const { getAllProducts, getProductsByCategory, getProductById } = require('../pages/api/product/ProductsController');
const redisClient = require('../lib/redis'); // Import Redis client

const { verifyRecaptchaToken } = require('../pages/api/user/recaptcha');


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
app.post('/register', async (req, res) => {
  const { username, password, email, phone, recaptchaToken } = req.body;

  const recaptchaIsValid = await verifyRecaptchaToken(recaptchaToken, res);
    if (!recaptchaIsValid) {
        return;  // End the request-response cycle if reCAPTCHA validation fails
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
  console.log(req.body);  // Ensure loginIdentifier and password are logged
  const { recaptchaToken, loginIdentifier, password } = req.body;
  if (!loginIdentifier || !password) {
    return res.status(400).send({ message: "Missing credentials" });
  }

  const recaptchaIsValid = await verifyRecaptchaToken(recaptchaToken, res);
    if (!recaptchaIsValid) {
        return;  // End the request-response cycle if reCAPTCHA validation fails
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

// Get products by category
app.get('/api/products/category/:categoryId', getProductsByCategory);

// Route to get a single product by ID
app.get('/api/products/:productId', getProductById);

// Start the server
app.listen(3001, () => {
    console.log('Server started on port 3001');
});
