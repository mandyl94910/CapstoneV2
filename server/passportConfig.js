const db = require('./db');  // Import the database connection module for database operations
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing comparison
const localStrategy = require('passport-local').Strategy; // Import the local strategy from passport-local for username/password authentication

module.exports = function(passport) {
    // Configure passport to use a local strategy, setting the username field to accept 'identifier' which could be either an email or username
    passport.use(
        new localStrategy({ usernameField: 'identifier' }, (identifier, password, done) => {
            // SQL query to find the user by username
            const queryByUsername = "SELECT * FROM customer WHERE customer_name = $1";
            // SQL query to find the user by email
            const queryByEmail = "SELECT * FROM customer WHERE email = $1";

            // Determine if the identifier is an email based on the presence of '@' symbol
            const isEmail = identifier.includes('@');
            const query = isEmail ? queryByEmail : queryByUsername; // Choose the appropriate query based on the identifier type

            // Execute the query with the provided identifier
            db.query(query, [identifier], (err, result) => {
                if (err) {
                    // If an error occurs during the query, pass it to the done function which handles errors
                    return done(err);
                }
                if (result.rows.length === 0) {
                    // If no user is found, pass false to done to indicate authentication failure
                    return done(null, false, { message: 'No user found' });
                }

                // If user is found, compare the hashed password stored in the database with the provided password
                bcrypt.compare(password, result.rows[0].password, (err, isMatch) => {
                    if (err) {
                        // If an error occurs during password comparison, pass it to the done function
                        return done(err);
                    }
                    if (isMatch) {
                        // If passwords match, return the user object to the done function indicating successful authentication
                        return done(null, result.rows[0]);
                    } else {
                        // If passwords do not match, return false to done to indicate authentication failure
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
        console.log("Deserializing user ID:", id); // Logging for debugging purposes
        const query = "SELECT * FROM customer WHERE customer_id = $1"; // Query to fetch the user based on ID
        db.query(query, [id], (err, result) => {
            if (err) {
                // Handle database errors during deserialization
                console.error("Database error during deserialization:", err);
                return done(err);
            }
            if (result.rows.length > 0) {
                // If user data is found, pass the user object to done to restore the login session
                console.log("Deserialized user data:", result.rows[0]);
                done(null, result.rows[0]);
            } else {
                // If no user data is found, pass an error to done indicating user not found
                done(new Error('User not found'), null);
            }
        });
    });
};
