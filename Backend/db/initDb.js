const { getConnection } = require('./db');

require('dotenv').config();

async function main() {
  let connection;

  try {
    connection = await getConnection();

    console.log('Clearing tables...');

    await connection.query('DROP TABLE IF EXISTS users, posts, votes');

    console.log('Creating new tables...');

    await connection.query(`CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(20) UNIQUE NOT NULL,
        email VARCHAR(60) UNIQUE NOT NULL,
        bio VARCHAR(200),
        password VARCHAR(50) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );`);

    await connection.query(`CREATE TABLE posts (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        user_id INTEGER NOT NULL,
        title VARCHAR(100) NOT NULL,
        description VARCHAR(200) NOT NULL,
        url VARCHAR(200),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
    );`);

    await connection.query(`CREATE TABLE votes (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        user_id INTEGER NOT NULL,
        post_id INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (post_id) REFERENCES posts(id),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );`);
  } catch (error) {
    console.error(error);
  } finally {
    if (connection) await connection.release();
    process.exit();
  }
}

main();
