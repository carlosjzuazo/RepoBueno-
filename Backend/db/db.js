const mysql = require('mysql2/promise');

const { DATABASE_HOST, DATABASE_USER, DATABASE_NAME, DATABASE_PASSWORD } =
  process.env;

let pool;

async function getConnection() {
  if (!pool) {
    pool = mysql.createPool({
      connectionLimit: 10,
      host: 'localhost',
      user: 'root',
      database: 'datalink',
      password: 'root',
      timezone: 'Z',
    });
  }

  return await pool.getConnection();
}

module.exports = { getConnection };
