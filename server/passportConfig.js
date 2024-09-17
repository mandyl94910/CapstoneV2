//C:\CPRG306\CapstoneV2\server\passportConfig.js
const db = require('./db');  // Import the database connection module for database operations
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing comparison
const localStrategy = require('passport-local').Strategy; // Import the local strategy from passport-local for username/password authentication

module.exports = function(passport) {
    // Configure passport to use a local strategy, setting the username field to accept 'identifier' which could be either an email or username
    passport.use(
        new localStrategy({ usernameField: 'loginIdentifier' }, (loginIdentifier, password, done) => {
          const queryByUsername = "SELECT * FROM customer WHERE customer_name = $1";
          const queryByEmail = "SELECT * FROM customer WHERE email = $1";
          const isEmail = loginIdentifier.includes('@');
          const query = isEmail ? queryByEmail : queryByUsername;
      
          db.query(query, [loginIdentifier], (err, result) => {
            if (err) {
              return done(err);
            }
            if (result.rows.length === 0) {
              return done(null, false, { message: 'No user found' });
            }
      
            bcrypt.compare(password, result.rows[0].password, (err, isMatch) => {
              if (err) {
                return done(err);
              }
              if (isMatch) {
                return done(null, result.rows[0]);
              } else {
                return done(null, false, { message: 'Incorrect password' });
              }
                });
            });
        })
    );

    // Serialize the user ID to the session to manage login sessions, only the user ID is stored in the session for efficiency
    passport.serializeUser((user, done) => {
        done(null, user.customer_id);
    });
    
    // Deserialize the user ID from the session and retrieve the user from the database using the ID
    passport.deserializeUser((id, done) => {
        const query = "SELECT * FROM customer WHERE customer_id = $1"; // Query to fetch the user based on ID
        db.query(query, [id], (err, result) => {
            if (err) {
                // Handle database errors during deserialization
                return done(err);
            }
            if (result.rows.length > 0) {
                // If user data is found, pass the user object to done to restore the login session
                done(null, result.rows[0]);
            } else {
                // If no user data is found, pass an error to done indicating user not found
                done(new Error('User not found'), null);
            }
        });
    });
};
