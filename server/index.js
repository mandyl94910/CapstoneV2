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
const redisClient = require('../lib/redis'); // 引入 Redis 客户端

const app = express();

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession({ secret: 'mySecretKey', resave: false, saveUninitialized: false }));
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(cookieParser('mySecretKey'));
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);



// Function to verify reCAPTCHA token
async function verifyRecaptchaToken(token) {
  const secretKey = '6LfBy0IqAAAAABgteFy0r2tdUCAC2C7bLllmjm0g';  // 使用正确的 reCAPTCHA secret key

  try {
    const response = await axios.post('https://www.google.com/recaptcha/api/siteverify', null, {
      params: {
        secret: secretKey,
        response: token,
      },
    });
    console.log("Google reCAPTCHA API response:", response.data);  // 打印 Google API 的响应
    const { success, score, error_codes } = response.data;
    if (!success) {
      throw new Error('reCAPTCHA verification failed');
    }
    return score;
  } catch (error) {
    throw new Error('Error during reCAPTCHA verification');
  }
}

// Registration route
app.post('/register', async (req, res) => {
  const { username, password, email, phone, recaptchaToken } = req.body;

  try {
    const recaptchaScore = await verifyRecaptchaToken(recaptchaToken);
    if (recaptchaScore < 0.5) {
      return res.status(400).send({ message: "reCAPTCHA validation failed. You might be a bot." });
    }
  } catch (error) {
    return res.status(500).send({ message: "reCAPTCHA verification failed" });
  }

  try {
    // 检查 Redis 缓存中是否存在用户名或邮箱
    const cachedUsername = await redisClient.get(`username_${username}`);
    redisClient.set(`username_${username}`, true, 'EX', 10800);

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
        // 缓存用户名，设置有效期
        redisClient.set('username_${username}', true, 'EX', 10,800); // 缓存1小时
        return res.status(400).send({ message: "Username already exists" });
      }
      if (result.rows.some(row => row.email === email)) {
        // 缓存邮箱，设置有效期
        redisClient.set('email_${email}', true, 'EX', 10,800); // 缓存1小时
        return res.status(400).send({ message: "Email already registered" });
      }

      // 插入新用户
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
    const { recaptchaToken, username } = req.body;

    try {
        const recaptchaScore = await verifyRecaptchaToken(recaptchaToken);
        if (recaptchaScore < 0.5) {
            return res.status(400).send({ message: "reCAPTCHA validation failed. You might be a bot." });
        }
    } catch (error) {
        return res.status(500).send({ message: "reCAPTCHA verification failed" });
    }

    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Authentication error');
        }
        if (!user) {
            redisClient.incr(`login_attempts_${username}`);
            redisClient.expire(`login_attempts_${username}`, 300);
            return res.status(400).send(info.message || 'Login failed');
        }

        console.log("User authenticated, about to log in:", user);  // Log user object after authentication
        req.logIn(user, async (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Login error');
            }
            console.log("User logged in successfully:", req.user);  // Log user object after login

            redisClient.del(`login_attempts_${username}`);

            const sessionData = { id: user.customer_id, username: user.customer_name };
            await redisClient.set(`session_${user.customer_id}`, JSON.stringify(sessionData), 'EX', 10800);
            res.send('User logged in');
        });
    })(req, res, next);
});


// Route to get current user information
app.get('/getUser', async (req, res) => {
  if (!req.user) {
    console.log("No user in session");
    return res.status(401).send('Not authenticated');
  }

  console.log("Current session user:", req.user);  // Log current user object from session

  try {
    const sessionKey = `session_${req.user.customer_id}`;
    const cachedSession = await redisClient.get(sessionKey);
    if (cachedSession) {
      const parsedSession = JSON.parse(cachedSession);
      console.log("Returning cached session for user:", parsedSession);
      if (parsedSession.customer_id !== req.user.customer_id) {
        console.log("Cached session user ID does not match current session user ID");
      }
      return res.send(parsedSession);
    } else {
      console.log("Caching new session for user:", req.user);
      await redisClient.set(sessionKey, JSON.stringify(req.user), 'EX', 10800); // Cache for 3 hours
      res.send(req.user);
    }
  } catch (error) {
    console.error("Error retrieving user session:", error);
    return res.status(500).send('Error retrieving user session');
  }
});



// // Route to get products
// app.get('/products', (req, res) => {
//     const query = "SELECT * FROM product"; // Query all products
//     db.query(query, (err, result) => {
//       if (err) {
//         console.error('Database error:', err);
//         return res.status(500).send('Database error');
//       }
//       res.send(result.rows);
//     });
//   });

// // Route to add products
// app.post('/products', (req, res) => {
//     const { product_name } = req.body; // Make sure you are destructuring the right property
//     if (!product_name) {
//       return res.status(400).send('Product name is required');
//     }
//     const query = "INSERT INTO product (product_name) VALUES ($1) RETURNING *";  // Returns all columns
//     db.query(query, [product_name], (err, result) => {
//     if (err) {
//         console.error('Database insertion error:', err);
//         return res.status(500).send('Database insertion error');
//     }
//     res.send(result.rows[0]); // Send back the newly created full product object
//     });
//   });

// // Route to delete products
// app.delete('/products/:id', (req, res) => {
//     const id = req.params.id;
//     const query = "DELETE FROM product WHERE product_id = $1"; // Delete product with specified id
//     db.query(query, [id], (err, result) => {
//       if (err) {
//         console.error('Database deletion error:', err);
//         return res.status(500).send('Database error');
//       }
//       res.send('Product deleted');
//     });
//   });

  //get all of the categories and products
  app.get('/api/categories', getCategories);

// Get all products
app.get('/api/products', getAllProducts);

// Get products by category
app.get('/api/products/category/:categoryId', getProductsByCategory);

// 路由：根据产品 ID 获取单个产品
app.get('/api/products/:productId', getProductById);  // 新增的路由


// Start server
app.listen(3001, () => {
    console.log('Server started on port 3001');
});