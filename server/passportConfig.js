//C:\CPRG306\CapstoneV2\server\passportConfig.js
const db = require('./db');  // Import the database connection module for database operations
//hash password function
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing comparison
const localStrategy = require('passport-local').Strategy; // Import the local strategy from passport-local for username/password authentication

// Function: Configure passport local strategy
// Description: Sets up passport to use a local authentication strategy. It configures the local strategy
//              to accept a login identifier, which can be either an email or username, and authenticate accordingly.
// Parameters:
//   passport (object): The passport middleware used in Express applications for handling authentication.
// Functionality:
//   This function uses the localStrategy constructor to create a new authentication strategy.
//   It determines whether the loginIdentifier is an email or a username and queries the database accordingly.
//   Upon finding the user, it compares the hashed password from the database with the provided password.
//   If the password is correct, it calls done with the user object; otherwise, it returns an authentication failure.
//learned from https://www.youtube.com/watch?v=WYHQP9lQgD8

module.exports = function(passport) {
    // Configure passport to use a local strategy, setting the username field to accept 'identifier' which could be either an email or username
    passport.use(
        new localStrategy({ usernameField: 'loginIdentifier' }, (loginIdentifier, password, done) => {
          const queryByUsername = "SELECT * FROM customer WHERE customer_name = $1";
          const queryByEmail = "SELECT * FROM customer WHERE email = $1";
          const isEmail = loginIdentifier.includes('@');
          //isEmail is a bollean. it select a different query method based on the value of isEmail.
          const query = isEmail ? queryByEmail : queryByUsername;
      
          db.query(query, [loginIdentifier], (err, result) => {
            if (err) {
              return done(err);
            }
            if (result.rows.length === 0) {
              return done(null, false, { message: 'No user found' });
            }
      
            // // Password hashing
            // bcrypt.compare(password, result.rows[0].password, (err, isMatch) => {
            //   if (err) {
            //     return done(err);
            //   }
            //   if (isMatch) {
            //     return done(null, result.rows[0]);
            //   } else {
            //     return done(null, false, { message: 'Incorrect password' });
            //   }
            //     });
            // normal password validation
            if (password === result.rows[0].password) { 
              return done(null, result.rows[0]);
            } else {
                return done(null, false, { message: 'Incorrect password' });
            }
            });
        })
    );

    // Function: Serialize User
// Description: Serializes the user ID into the session. This is part of the login process where only the user's ID is stored in the session store to efficiently manage user sessions.
// Parameters:
//   user (object): The user object that contains all user details.
//   done (function): A callback function that returns the execution to Passport with parameters for errors or successful result.
// Functionality:
//   This function takes the user object, extracts the customer_id, and stores it in the session. This helps in reducing the session data size and improves performance.
//Serialization is the process of converting a data structure or object into a format that can be stored or transmitted
    passport.serializeUser((user, done) => {
        done(null, user.customer_id);
    });
    
// Function: Deserialize User
// Description: Deserializes the user ID from the session and fetches the full user object from the database. This function is called on every request once the user is authenticated to retrieve user data from the session ID.
// Parameters:
//   id (integer): The user's customer ID that was stored in the session.
//   done (function): A callback function that returns the execution to Passport with parameters for errors or successful user data retrieval.
// Functionality:
//   This function queries the database to find the user by the serialized customer_id. If found, it returns the full user object; otherwise, it reports an error indicating the user was not found.
//Deserialization is the process of reducing data in this format to its original object or data structure.
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
      }
    )

  // Function: Serialize User
  // Description: Serializes the user ID into the session. This is part of the login process where only the user's ID is stored in the session store to efficiently manage user sessions.
  // Parameters:
  //   user (object): The user object that contains all user details.
  //   done (function): A callback function that returns the execution to Passport with parameters for errors or successful result.
  // Functionality:
  //   This function takes the user object, extracts the customer_id, and stores it in the session. This helps in reducing the session data size and improves performance.
  passport.serializeUser((user, done) => {
    done(null, user.customer_id);
  });

  // Function: Deserialize User
  // Description: Deserializes the user ID from the session and fetches the full user object from the database. This function is called on every request once the user is authenticated to retrieve user data from the session ID.
  // Parameters:
  //   id (integer): The user's customer ID that was stored in the session.
  //   done (function): A callback function that returns the execution to Passport with parameters for errors or successful user data retrieval.
  // Functionality:
  //   This function queries the database to find the user by the serialized customer_id. If found, it returns the full user object; otherwise, it reports an error indicating the user was not found.
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
        done(new Error("User not found"), null);
      }
    });
  });
};
