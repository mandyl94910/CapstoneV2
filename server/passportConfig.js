const db = require('./db');
const bcrypt = require('bcrypt');
const localStrategy = require('passport-local').Strategy;

module.exports = function(passport) {
    passport.use(
        new localStrategy((username, password, done) => {
            const query = "SELECT * FROM capstonedatabase.users WHERE username = ?";
            db.query(query, [username], (err, result) => {
                if (err) {
                    return done(err);
                }
                if (result.length === 0) {
                    return done(null, false, { message: 'No user found' });
                }
                bcrypt.compare(password, result[0].password, (err, isMatch) => {
                    if (err) {
                        return done(err);
                    }
                    if (isMatch) {
                        return done(null, result[0]);  // 成功登录后返回用户信息
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
        const query = "SELECT * FROM capstonedatabase.users WHERE id = ?";
        db.query(query, [id], (err, result) => {
            if (err) {
                return done(err);
            }
            const userInfo = {
                id: result[0].id,
                username: result[0].username,
                email: result[0].email  // 返回 email
            };
            done(null, userInfo);
        });
    });
};
