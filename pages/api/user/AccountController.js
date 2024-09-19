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
const { saveSession, getSession,updateSession,deleteSession,incrementLoginAttempts } = require('../../../lib/redisUtils/listOps');
const { setCache, getCache} = require('../../../lib/redisUtils/cacheOps');
const bcrypt = require('bcrypt');
const db = require('../../../server/db');

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

async function registerFunction(req, res) {
  const { username, password, email, phone, recaptchaToken } = req.body;

  try {
    const recaptchaResult = await verifyRecaptchaToken(recaptchaToken);
    if (!recaptchaResult.isValid) {
      return res.status(400).send({ message: recaptchaResult.message });
    }

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

async function getUserInformation(req, res) {
  if (!req.user) {
    return res.status(401).send('Not authenticated');
  }

  try {
    const sessionKey = `session_${req.user.customer_id}`;
    const cachedSession = await redisClient.get(sessionKey);
    if (cachedSession) {
      return res.send(cachedSession);
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



  module.exports = {
    loginFunction,
    registerFunction,
    getUserInformation
  };