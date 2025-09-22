const { Pool } = require("pg");
const dotenv = require('dotenv')
dotenv.config()

module.exports = new Pool({
  connectionString: process.env.DB_CONNECTION_STRING,
});
