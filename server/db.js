//C:\CPRG306\CapstoneV1\server\db.js
const mysql = require('mysql');

const db = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'capstonedatabase'
});

module.exports = db;