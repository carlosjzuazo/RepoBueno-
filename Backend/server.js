require('dotenv').config();

const express = require('express');
const morgan = require('morgan');

const cors = require('cors');

const {
  newUserController,
  getUserController,
  getUserPostsController,
  getMyUserController,
  loginController,
} = require('./controllers/users');

const {
  getPostsController,
  newPostController,
  getSinglePostController,
  deletePostController,
} = require('./controllers/posts');

const { authUser } = require('./middlewares/auth');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.post('/user', newUserController);
app.get('/user/:id', getUserController);
app.get('/user/:id/posts', getUserPostsController);
app.get('/user', authUser, getMyUserController);
app.post('/login', loginController);

app.post('/', authUser, newPostController);
app.get('/', getPostsController);
app.get('/post/:id', getSinglePostController);
app.delete('/post/:id', authUser, deletePostController);

// Middlewares de gestión de errores
app.use((req, res) => {
  res.status(404).send({
    status: 'error',
    message: 'Not found',
  });
});

app.use((error, req, res, next) => {
  console.error(error);

  res.status(error.httpStatus || 500).send({
    status: 'error',
    message: error.message,
  });
});

const { DATABASE_PORT } = process.env;

app.listen(DATABASE_PORT, () => {
  console.log(`Server listening: http://localhost:${DATABASE_PORT}`);
});
