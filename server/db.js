//C:\CPRG306\CapstoneV1\server\db.js
const { Pool } = require('pg');

const db = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'capstonedatabase2', // 在这里填写你要使用的数据库名称
    password: 'password',
    port: 5432, // PostgreSQL 的默认端口
});

module.exports = db;