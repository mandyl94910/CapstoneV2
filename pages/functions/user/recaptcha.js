// C:\CPRG306\CapstoneV2\pages\api\user\recaptcha.js
const axios = require('axios'); 
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const db = require('../../../server/db');
require('../../../server/passportConfig')(passport); // Correctly import passportConfig.js

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

// Function to verify reCAPTCHA token
async function verifyRecaptchaToken(token) {
  const secretKey = '6LfBy0IqAAAAABgteFy0r2tdUCAC2C7bLllmjm0g';  // Use the correct reCAPTCHA secret key

  try {
      const response = await axios.post('https://www.google.com/recaptcha/api/siteverify', null, {
          params: {
              secret: secretKey,
              response: token,
          },
      });
      console.log("Google reCAPTCHA API response:", response.data);
      const { success, score, error_codes } = response.data;

      if (!success || score < 0.5) {
          return { isValid: false, message: "reCAPTCHA validation failed. You might be a bot." };
      }

      return { isValid: true };
  } catch (error) {
      return { isValid: false, message: "reCAPTCHA verification failed" };
  }
}

  module.exports = {
    verifyRecaptchaToken,
  };