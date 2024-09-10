const db = require('./db');  // Ensure correct import of the database module
const bcrypt = require('bcrypt');
const localStrategy = require('passport-local').Strategy;

module.exports = function(passport) {
    passport.use(
        new localStrategy({ usernameField: 'identifier' }, (identifier, password, done) => {
            // SQL queries to find user by username or email
            const queryByUsername = "SELECT * FROM users WHERE username = $1";
            const queryByEmail = "SELECT * FROM users WHERE email = $1";

            // Determine if the identifier is an email or username
            const isEmail = identifier.includes('@');
            const query = isEmail ? queryByEmail : queryByUsername;

            // Database query
            db.query(query, [identifier], (err, result) => {
                if (err) {
                    return done(err);
                }
                if (result.rows.length === 0) {
                    return done(null, false, { message: 'No user found' });
                }

                // Compare password
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

    // Serialize the user for the session
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    // Deserialize the user from the session
    passport.deserializeUser((id, done) => {
        const query = "SELECT * FROM users WHERE id = $1";
        db.query(query, [id], (err, result) => {
            if (err) {
                return done(err);
            }
            const userInfo = {
                id: result.rows[0].id,
                username: result.rows[0].username,
                email: result.rows[0].email
            };
            done(null, userInfo);
        });
    });
};
