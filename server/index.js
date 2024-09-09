//C:\CPRG306\CapstoneV1\server\index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const db = require('./db');

const app = express();

// 中间件设置
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession({ secret: 'mySecretKey', resave: false, saveUninitialized: false }));
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(cookieParser('mySecretKey'));
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

// 注册路由
app.post('/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    const query1 = "INSERT INTO users (username, password, email) VALUES ($1, $2, $3)";
    const query2 = "SELECT * FROM users WHERE username = $1";

    db.query(query2, [username], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Database error');
        }
        if (result.rows.length > 0) {
            return res.send({ message: "Username already exists" });
        } else {
            const hashedPassword = bcrypt.hashSync(password, 10);
            db.query(query1, [username, hashedPassword, email], (err, result) => {
                if (err) {
                    console.error('Database insertion error:', err);
                    return res.status(500).send('Database error');
                }
                res.send({ message: "User created" });
            });
        }
    });
});

// 登录路由
app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Authentication error');
        }
        if (!user) {
            return res.send(info.message || 'Login failed');
        }
        req.logIn(user, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Login error');
            }
            res.send('User logged in');
            console.log(user);
        });
    })(req, res, next);
});

// 获取当前用户信息的路由
app.get('/getUser', (req, res) => {
    if (!req.user) {
        return res.status(401).send('Not authenticated');
    }
    res.send(req.user);
});

// 获取所有items的路由
app.get('/items', (req, res) => {
    const query = "SELECT * FROM items";
    db.query(query, (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send('Database error');
        }
        res.send(result.rows); // 只返回查询到的rows
    });
});

// 添加新item的路由
app.post('/items', (req, res) => {
    const { name } = req.body;
    const query = "INSERT INTO items (name) VALUES ($1) RETURNING id";
    db.query(query, [name], (err, result) => {
        if (err) {
            console.error('Database insertion error:', err);
            return res.status(500).send('Database error');
        }
        const newItem = { id: result.rows[0].id, name }; // 获取新插入的item的id
        res.send(newItem); // 返回新增的item
    });
});

// 删除item的路由
app.delete('/items/:id', (req, res) => {
    const id = req.params.id;
    const query = "DELETE FROM items WHERE id = ?";
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Database deletion error:', err);
            return res.status(500).send('Database error');
        }
        res.send('Item deleted');
    });
});

// 启动服务器
app.listen(3001, () => {
    console.log('Server started on port 3001');
});
