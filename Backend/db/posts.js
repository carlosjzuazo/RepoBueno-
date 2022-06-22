const { generateError } = require('../helpers');
const { getConnection } = require('./db');

const deletePostById = async (id) => {
  let connection;

  try {
    connection = await getConnection();

    await connection.query(
      `
      DELETE FROM posts WHERE id = ?
    `,
      [id]
    );
  } finally {
    if (connection) connection.release();
  }
};

const getPostById = async (id) => {
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.query(
      `
          SELECT posts.id, posts.user_id, posts.description, posts.title, posts.url, posts.created_at, users.email FROM posts LEFT JOIN users on posts.user_id = users.id WHERE posts.id = ?
    `,
      [id]
    );

    if (result.length === 0) {
      throw generateError(`Post with id: ${id} does not exists`, 404);
    }

    return result[0];
  } finally {
    if (connection) connection.release();
  }
};

const getPostsByUserId = async (id) => {
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.query(
      `
          SELECT posts.*, users.email FROM posts LEFT JOIN users on posts.user_id = users.id WHERE posts.user_id = ?
    `,
      [id]
    );

    return result;
  } finally {
    if (connection) connection.release();
  }
};

const getAllPosts = async () => {
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.query(`
        SELECT posts.id, posts.user_id, posts.description, posts.title, posts.url, posts.created_at, users.email FROM posts LEFT JOIN users on posts.user_id = users.id ORDER BY posts.created_at DESC
    `);

    return result;
  } finally {
    if (connection) connection.release();
  }
};

const createPost = async (user_id, description, title, url = '') => {
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.query(
      `
      INSERT INTO posts (user_id, description, title, url)
      VALUES(?,?,?,?)
    `,
      [user_id, description, title, url]
    );

    return result.insertId;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  deletePostById,
  createPost,
  getAllPosts,
  getPostById,
  getPostsByUserId,
};
