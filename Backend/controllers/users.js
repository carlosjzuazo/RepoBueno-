const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {schemaUsers} = require('./joi');
const { generateError } = require('../helpers');
const { createUser, getUserById, getUserByEmail } = require('../db/users');
const { getPostsByUserId } = require('../db/posts');

const newUserController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const validateUser = schemaPosts.validate(req.body); 

    // Esto debería ser sustituido por joi
    if (validatePost.error) {
      console.error(validatePost.error.message);
    }

    const id = await createUser(email, password);

    res.send({
      status: 'ok',
      message: `User created with id: ${id}`,
    });
  } catch (error) {
    next(error);
  }
};

const getUserController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await getUserById(id);

    res.send({
      status: 'ok',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const getUserPostsController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await getPostsByUserId(id);

    res.send({
      status: 'ok',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const getMyUserController = async (req, res, next) => {
  try {
    const user = await getUserById(req.userId, false);

    res.send({
      status: 'ok',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw generateError('You must send an email and a password', 400);
    }

    const user = await getUserByEmail(email);

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      throw generateError('La contraseña no coincide', 401);
    }

    const tokenPayload = { id: user.id };

    const token = jwt.sign(tokenPayload, process.env.REACT_APP_JWT_SECRET, {
      expiresIn: '30d',
    });

    res.send({
      status: 'ok',
      data: token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  newUserController,
  getUserController,
  getUserPostsController,
  getMyUserController,
  loginController,
};
