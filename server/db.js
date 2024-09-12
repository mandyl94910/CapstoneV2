//C:\CPRG306\CapstoneV1\server\db.js
const { Pool } = require('pg');

const db = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'capstonedatabase2', // Fill in the name of the database you want to use here
    password: 'password',
    port: 5432, // Default Port for PostgreSQL
});

module.exports = db;