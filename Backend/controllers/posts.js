const {schemaPosts} = require('./joi');

const {
  createPost,
  getAllPosts,
  getPostById,
  deletePostById,
} = require('../db/posts');
const { generateError } = require('../helpers');
const { schemaPosts } = require('./joi');

const getPostsController = async (req, res, next) => {
  try {
    const posts = await getAllPosts();

    res.send({
      status: 'ok',
      data: posts,
    });
  } catch (error) {
    next(error);
  }
};

const newPostController = async (req, res, next) => {
  try {
    const { description, title, url } = req.body;
    const validatePost = schemaPosts.validate(req.body);

    if (validatePost.error) {
      console.error(validatePost.error.message);
    }

    const id = await createPost(req.userId, description, title, url);

    const post = await getPostById(id);

    res.send({
      status: 'ok',
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

const getSinglePostController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const tweet = await getTweetById(id);

    res.send({
      status: 'ok',
      data: tweet,
    });
  } catch (error) {
    next(error);
  }
};

const deletePostController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = await deletePostById(id);

    if (req.userId !== post.user_id) {
      throw generateError('Must be the owner to delete', 401);
    }

    await deletePostById(id);

    res.send({
      status: 'ok',
      message: `Post with id: ${id} was deleted`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPostsController,
  newPostController,
  getSinglePostController,
  deletePostController,
};
