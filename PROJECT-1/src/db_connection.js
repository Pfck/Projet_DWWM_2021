require('dotenv').config();
const mysql = require('mysql');

let config = {
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME
}

const connection = mysql.createPool(config);

module.exports = connection;