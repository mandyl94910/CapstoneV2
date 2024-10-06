// C:\CPRG306\CapstoneV2\pages\api\user\AccountController.js
const axios = require('axios'); 
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
require('../../../server/passportConfig')(passport); // Correctly import passportConfig.js
const redisClient = require('../../../lib/redis'); // Import Redis client
const { saveSession, getSession,updateSession,deleteSession,incrementLoginAttempts } = require('../../../lib/redisUtils/userOps');
const { setCache, getCache} = require('../../../lib/redisUtils/cacheOps');
const bcrypt = require('bcrypt');
const db = require('../../../server/db');
const { Customer, Order,sequelize} = require('../../../server/models');  

const { verifyRecaptchaToken } = require('./recaptcha');


const app = express();

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession({ secret: 'mySecretKey', resave: false, saveUninitialized: false }));
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(cookieParser('mySecretKey'));
app.use(passport.initialize());
app.use(passport.session());
require("../../../server/passportConfig")(passport);  // Initialize Passport for authentication

// Function name: loginFunction
// Description: Authenticates a user using their login credentials and manages login attempts.
// Parameters:
//   req (object): The HTTP request object containing login details (recaptcha token, login identifier, password).
//   res (object): The HTTP response object used for sending back the authentication result.
//   next (function): Middleware next function for passing control to the next middleware function.
// Functionality:
//   This function validates the provided credentials, checks recaptcha validation, and uses Passport.js
//   to authenticate the user based on email or username. It handles login attempts and locks out users
//   after too many failed attempts. It logs in the user on successful authentication and manages session data.
async function loginFunction(req, res, next) {
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
  passport.authenticate('local', searchCriteria, async(err, user, info) => {
      if (err) {
          console.error(err);
          return res.status(500).send('Authentication error');
      }
      if (!user) {
          // If no user is found or password is incorrect, increment login attempt counter
          const attemptResult = await incrementLoginAttempts(loginIdentifier);
          if (attemptResult.tooManyAttempts) {
              // If login attempt limit is reached, return status code 429 with an error message
              return res.status(429).send({ success: false, message: attemptResult.message });
          }
          // Otherwise, return status code 400 with a failure message
          return res.status(400).send({ success: false, message: info.message || 'Login failed' });
      }

      req.logIn(user, async (err) => {
          if (err) {
              console.error(err);
              return res.status(500).send('Login error');
          }

          // After successful login, delete previous login attempt records
          await deleteSession(`login_attempts_${loginIdentifier}`);
          // Cache user session data with a 3-hour expiration
          const sessionData = { id: user.customer_id, username: user.customer_name };
          await saveSession(user.customer_id, sessionData, 10800); 
          // Return a message indicating successful login
          res.send({ success: true, message: 'User logged in' });
      });
  })(req, res, next);
}

// Function name: registerFunction
// Description: Registers a new user in the database after validating the recaptcha token and checking for existing users.
// Parameters:
//   req (object): The HTTP request object containing user details for registration.
//   res (object): The HTTP response object used to send back the registration result.
// Functionality:
//   This function validates a recaptcha token, checks if the username or email already exists in the database,
//   hashes the user's password for security, and inserts the new user record into the database. It sends a response
//   indicating whether the registration was successful or failed.
async function registerFunction(req, res) {
  const { username, password, email, phone, recaptchaToken } = req.body;

  try {
    const recaptchaResult = await verifyRecaptchaToken(recaptchaToken);
    if (!recaptchaResult.isValid) {
      return res.status(400).send({ message: recaptchaResult.message });
    }

    //Password hashing
    const hashedPassword = bcrypt.hashSync(password, 10);
    const query = "SELECT customer_name, email FROM customer WHERE customer_name = $1 OR email = $2";
    const result = await db.query(query, [username, email]);
    if (result.rows.length > 0) {
      return res.status(400).send({ message: "Username or email already exists" });
    }

    const insertQuery = "INSERT INTO customer (customer_name, password, email, phone) VALUES ($1, $2, $3, $4)";
    await db.query(insertQuery, [username, hashedPassword, email, phone]);
    res.send({ message: "User created" });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).send('Unexpected server error');
  }
}

// Function name: getUserInformation
// Description: Retrieves user information from the cache or the database if the user is authenticated.
// Parameters:
//   req (object): The HTTP request object, which contains user session data.
//   res (object): The HTTP response object used to send back the user's data or an error message.
// Functionality:
//   This function checks if a user is authenticated. If so, it attempts to retrieve user session data from the cache.
//   If the data is not cached, it caches the current session data and returns the user's information. It handles errors
//   that may occur during data retrieval.
async function getUserInformation(req, res) {
  console.log('the user for getUserInformation:',req.user)
  if (!req.user) {
    return res.status(401).send('Not authenticated');
  }

  try {
    const sessionKey = `session_${req.user.customer_id}`;
    const cachedSession = await redisClient.get(sessionKey);
    if (cachedSession) {
      console.log(`Cached session found: ${cachedSession}`);
      const parsedSession = JSON.parse(cachedSession);
      return res.send(parsedSession);
    } else {
      // Cache the session if not already cached
      await setCache(sessionKey, req.user, 10800); // Cache for 3 hours
      res.send(req.user);
    }
  } catch (error) {
    console.error('Error retrieving user session:', error);
    return res.status(500).send('Error retrieving user session');
  }
}

// Get all users' controller functions
const getAllUsers = async (req, res) => {
    try {
      const customers = await Customer.findAll({
        attributes: [
          'customer_id',
          'customer_name',
          'email',
          // Using the Sequelize Function COUNT to Calculate Order Quantity
          [sequelize.fn('COUNT', sequelize.col('Orders.id')), 'order_count']
        ],
        include: [
          {
            model: Order,  // Associated Order Form
            attributes: [], 
          }
        ],
        order: [['customer_id', 'ASC']],
        //so that the database can know how to group these columns
        group: ['Customer.customer_id']  //Grouping is required to avoid aggregation errors
      });
      
      // console.log('Filtered Results from DB:', customers.filter(customer => customer.customer_id >= 1 && customer.customer_id <= 20));
      res.json(customers);
    } catch (err) {
      console.error('Error fetching users:', err);
      res.status(500).send('Error fetching users');
    }
  };

  module.exports = {
    loginFunction,
    registerFunction,
    getUserInformation,
    getAllUsers
  };