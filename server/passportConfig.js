const db = require('./db');  // 确保正确导入数据库模块
const bcrypt = require('bcrypt');
const localStrategy = require('passport-local').Strategy;

module.exports = function(passport) {
    passport.use(
        new localStrategy({ usernameField: 'identifier' }, (identifier, password, done) => {
            const queryByUsername = "SELECT * FROM users WHERE username = $1";
            const queryByEmail = "SELECT * FROM users WHERE email = $1";

            const isEmail = identifier.includes('@');  // 判断 identifier 是邮箱还是用户名
            const query = isEmail ? queryByEmail : queryByUsername;

            db.query(query, [identifier], (err, result) => {  // db 查询
                if (err) {
                    return done(err);
                }
                if (result.rows.length === 0) {
                    return done(null, false, { message: 'No user found' });
                }

                // 对比密码
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
