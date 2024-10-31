// C:\CPRG306\CapstoneV2\pages\api\user\AccountController.js
const passport = require('passport');

const axios = require('axios'); 
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const redisClient = require('../../../lib/redis'); // Import Redis client
const { saveSession, getSession, updateSession, deleteSession, incrementLoginAttempts } = require('../../../lib/redisUtils/userOps');
const { setCache, getCache,deleteCache } = require('../../../lib/redisUtils/cacheOps');
const bcrypt = require('bcrypt');
const db = require('../../../server/db');
const { Customer, Order,sequelize} = require('../../../server/models');  
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const RESET_URL_BASE = 'http://localhost:3000/resetpassword';

const { verifyRecaptchaToken } = require('./recaptcha');


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
  //|| is Logical OR Operator
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
          // Otherwise, return status code 400 with a failure message, || is Logical OR Operator
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

const loginByEmail = async (req, res, next) => {
  console.log("Request body:", req.body);
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ message: "Missing email for login" });
  }
  
  passport.authenticate('email-login', async (err, user, info) => {
    if (err) {
      console.error("Authentication error:", err);
      return res.status(500).json({ message: 'Authentication error' });
    }

    if (!user) {
      console.log("No user found with the provided email:", req.body.email);
      return res.status(400).json({ message: info.message || 'No user found' });
    }

    // 登录并保存用户信息到会话
    req.logIn(user, async (err) => {
      if (err) {
        console.error("Login error:", err);
        return res.status(500).json({ message: 'Login error' });
      }
      console.log("Login successful, req.user:", req.user);
      // Save the session to ensure persistence
      req.session.save((err) => {
        if (err) {
          return res.status(500).json({ message: 'Session save error' });
        }
        // 返回成功响应
        res.json({ success: true, message: 'User logged in' });
      });
    });
  })(req, res, next);
};

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
    // const hashedPassword = bcrypt.hashSync(password, 10);
    const query = "SELECT customer_name, email FROM customer WHERE customer_name = $1 OR email = $2";
    const result = await db.query(query, [username, email]);
    if (result.rows.length > 0) {
      return res.status(400).send({ message: "Username or email already exists" });
    }

    const insertQuery = "INSERT INTO customer (customer_name, password, email, phone) VALUES ($1, $2, $3, $4)";
    await db.query(insertQuery, [username, password, email, phone]);
    res.send({ message: "User created and the page will be returned to Login page" });
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

// Function name: getAllUsers
// Description: Retrieves all users along with the count of their associated orders from the database.
// Parameters:
//   req (object): The HTTP request object.
//   res (object): The HTTP response object, used to return the users' data or an error message.
// Functionality:
//   This function queries the Customer model to get each customer's ID, name, and email along with the count of their
//   orders by joining with the Orders table. It groups the data by customer ID to avoid aggregation errors. 
//   If successful, it sends back the data; otherwise, it handles any errors that occur during the query.
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

  // Function name: getUserTotalNumber
// Description: Retrieves the total count of users from the Customer table.
// Parameters:
//   req (object): The HTTP request object.
//   res (object): The HTTP response object used to return the total user count or an error message.
// Functionality:
//   This function counts the total number of customers in the Customer table. If successful, it returns the count in JSON format.
//   It also handles any errors that may occur during the count query.
  const getUserTotalNumber = async (req, res) => {
    try {
      const totalUsers = await Customer.count();
      //totalUsers need to be return as an object
      res.json({ totalUsers });
    } catch (error) {
      res.status(500).send('Server Error');
    }
  };

// Function name: getNewUsers
// Description: Counts new users who registered within the last week.
// Parameters:
//   req (object): The HTTP request object.
//   res (object): The HTTP response object used to return the count of new users or an error message.
// Functionality:
//   This function calculates a date one week prior to the current date, then counts users in the Customer table
//   who registered on or after that date. It returns the count in JSON format if successful and handles any errors.
const getNewUsers = async (req, res) => {
  try {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7); // Set the date to one week ago

    const newUsers = await Customer.count({
      where: {
        register_date: {
          //$gte means greater than or equal to
          $gte: oneWeekAgo, // Filter criteria to get users with registration date within one week
        },
      },
    });
    res.json({ newUsers });
  } catch (error) {
    console.error("Error fetching new users:", error);
    res.status(500).send('Server Error');
  }
};

// Functions to authenticate mailboxes
const verifyEmail = async (req, res) => {
  const { email } = req.body;

  try {
    // Find out if the mailbox exists in the database
    const customer = await Customer.findOne({ where: { email } });

    if (customer) {
      // If the mailbox exists, return the mailbox value
      return res.status(200).json({ email: customer.email, exists: true });
    } else {
      // Return false if the mailbox does not exist
      return res.status(200).json({ exists: false });
    }
  } catch (error) {
    console.error('Error verifying email:', error);
    res.status(500).json({ message: 'An error occurred. Please try again later.' });
  }
};

const sendResetPasswordEmail = async (req, res) => {
  const { email } = req.body;

  try {
   // Generate a random token
    const token = crypto.randomBytes(32).toString('hex');

    // Set the reset password URL, including the token
    const resetUrl = `${RESET_URL_BASE}?token=${token}`;

    // Store token and email in Redis with an expiration time of 10 minutes (600 seconds)
    await setCache(token, { email }, 600); 

    // Create a mail delivery service
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'mandyl94910@gmail.com', // Sender's e-mail
        pass: 'esgaoptocroqcehq', // app password
      },
    });

        // Define the content of the message
    const mailOptions = {
      from: 'mandyl94910@gmail.com',
      to: email, // Recipient
      subject: 'Reset Your Password',
      text: `Click the following link to reset your password: ${resetUrl}. This link will expire in 10 minutes.`,
    };
    await transporter.sendMail(mailOptions);

    // Respond to the front-end to indicate that the email has been sent

    return res.status(200).json({ message: 'Reset password email sent.' });
  } catch (error) {
    console.error('Error sending reset password email:', error);
    return res.status(500).json({ message: 'An error occurred. Please try again later.' });
  }
};

const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    // get the email address associated with the token from Redis (267)
    const cachedData = await getCache(token);
     
  // If the token does not exist or has expired, return an explicit error message
    if (!cachedData || !cachedData.email) {
      return res.status(400).json({ message: 'Invalid or expired token.' });
    }

    const { email } = cachedData;

    // Find users in the database by mailbox
    const customer = await Customer.findOne({ where: { email } });

    if (!customer) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // update the user's password
    customer.password = newPassword;
    await customer.save();

    // Deleting a token in Redis ensures that the token is only used once.
    await deleteCache(token);

    return res.status(200).json({ message: 'Password updated successfully.' });
  } catch (error) {
    console.error('Error resetting password:', error);
    return res.status(500).json({ message: 'An error occurred. Please try again later.' });
  }
};

  module.exports = {
    loginFunction,
    loginByEmail,
    registerFunction,
    getUserInformation,
    getAllUsers,
    getUserTotalNumber,
    getNewUsers,
    verifyEmail,
    sendResetPasswordEmail,
    resetPassword
  };