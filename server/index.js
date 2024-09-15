// C:\CPRG306\CapstoneV1\server\index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const db = require('./db');
require('./passportConfig')(passport); // Correctly import passportConfig.js

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

// Registration route
app.post('/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const phone = req.body.phone_number;
  
    // Password validation rule, ensure at least 6 characters and includes both letters and numbers
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*[0-9]).{6,}$/;
  
    // If the password does not meet complexity requirements, return an error
    if (!passwordRegex.test(password)) {
      console.log("Password validation failed");
      return res.status(400).send('Password must be at least 6 characters long and contain both letters and numbers.');
    }
  
    // If the password meets complexity requirements, then hash it
    const hashedPassword = bcrypt.hashSync(password, 10);
  
    // Perform database query to ensure username is unique
    const query1 = "INSERT INTO customer (customer_name, password, email, phone) VALUES ($1, $2, $3, $4)";
    const query2 = "SELECT * FROM customer WHERE customer_name = $1";
  
    db.query(query2, [username], (err, result) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).send('Database error');
      }
  
      if (result.rows.length > 0) {
        return res.status(400).send({ message: "Username already exists" });
      } else {
        // Insert new user
        db.query(query1, [username, hashedPassword, email, phone], (err, result) => {
          if (err) {
            console.error('Database insertion error:', err);
            return res.status(500).send('Database insertion error');
          }
          res.send({ message: "User created" });
        });
      }
    });
  });

// Login route
app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Authentication error');
        }
        if (!user) {
            return res.send(info.message || 'Login failed');
        }
        req.logIn(user, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Login error');
            }
            res.send('User logged in');
            console.log(user);
        });
    })(req, res, next);
});

// Route to get current user information
app.get('/getUser', (req, res) => {
    if (!req.user) {
        return res.status(401).send('Not authenticated');
    }
    res.send(req.user);
});

// Route to get products
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

// Rout to get products according to category
app.get('/products', async(req, res) => {
  const { category } = req.query;

  try {
    let query = 'SELECT * FROM produc'; // query all products by default
    const queryParams = [];

    // if there is specific category pass by, modify the query request
    if (category && category !== 'All Products'){
      query += ' WHERE category_name = $1';
      queryParams.push(category);
    }

    const result = await Pool.query(query, queryParams);
    res.json(result.rows);
  } catch (error) {
    console.error('Database error:', err);
    res.status(500).send('Database error');
  }
});

// Route to add products
app.post('/products', (req, res) => {
    const { product_name } = req.body; // Make sure you are destructuring the right property
    if (!product_name) {
      return res.status(400).send('Product name is required');
    }
    const query = "INSERT INTO product (product_name) VALUES ($1) RETURNING *";  // Returns all columns
    db.query(query, [product_name], (err, result) => {
    if (err) {
        console.error('Database insertion error:', err);
        return res.status(500).send('Database insertion error');
    }
    res.send(result.rows[0]); // Send back the newly created full product object
    });
  });

// Route to delete products
app.delete('/products/:id', (req, res) => {
    const id = req.params.id;
    const query = "DELETE FROM product WHERE product_id = $1"; // Delete product with specified id
    db.query(query, [id], (err, result) => {
      if (err) {
        console.error('Database deletion error:', err);
        return res.status(500).send('Database error');
      }
      res.send('Product deleted');
    });
  });

// Start server
app.listen(3001, () => {
    console.log('Server started on port 3001');
});
