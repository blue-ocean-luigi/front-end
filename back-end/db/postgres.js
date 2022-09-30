const { Pool } = require('pg');
const dotenv = require ('dotenv');
dotenv.config();

module.exports = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
})