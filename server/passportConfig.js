//C:\CPRG306\CapstoneV2\server\passportConfig.js
const db = require('./db');
const bcrypt = require('bcrypt');
const localStrategy = require('passport-local').Strategy;

module.exports = function(passport) {
    passport.use(
        new localStrategy((username, password, done) => {
            const query = "SELECT * FROM users WHERE username = $1";
            db.query(query, [username], (err, result) => {
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

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    
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