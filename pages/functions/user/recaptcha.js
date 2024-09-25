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

//usging instruction is from https://www.google.com/recaptcha 
// Function name: verifyRecaptchaToken
// Description: Verifies a reCAPTCHA token received from the frontend to determine if the request is coming from a human or a bot.
// Parameters:
//   token (string): The reCAPTCHA token provided by the frontend for verification.
// Functionality:
//   This function sends a POST request to the Google reCAPTCHA verification API. 
//   It includes the `secretKey` (server-side key) and the `token` (from the client) as parameters in the request.
//   The Google API responds with a success status, score (between 0.0 and 1.0, indicating how likely the interaction is human), and possible error codes.
//   If the verification is not successful or the score is below 0.5, the function considers the request as potentially made by a bot and returns a failure response.
//   If the verification is successful and the score is satisfactory, the function returns a success response.
//   In case of any errors during the API call (like network issues), the function catches the error and returns a failure message.
async function verifyRecaptchaToken(token) {
  // Use the correct reCAPTCHA secret key
  const secretKey = '6LfBy0IqAAAAABgteFy0r2tdUCAC2C7bLllmjm0g';  // Use the correct reCAPTCHA secret key

  try {
    // Send a POST request to Google's reCAPTCHA API to verify the token
      const response = await axios.post('https://www.google.com/recaptcha/api/siteverify', null, {
          params: {
            // Server-side secret key for reCAPTCHA verification
              secret: secretKey,
              // The token provided by the frontend
              response: token,
          },
      });
      console.log("Google reCAPTCHA API response:", response.data);
      // Destructure the response to extract important fields
      const { success, score, error_codes } = response.data;

      // Check if the verification was successful and if the score is high enough to pass the threshold
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