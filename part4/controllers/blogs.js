const blogsRouter = require('express').Router();
const Blog = require('../models/blogs');
const User = require('../models/user');
const { getToken, getUser } = require('../utils/middleware');

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', {
      username: 1,
      name: 1,
      id: 1,
    });
    response.json(blogs);
  } catch (error) {
    next(error);
  }
});

blogsRouter.post('/', getToken, getUser, async (request, response, next) => {
  try {
    const user = await User.findById(request.userId);
    const blog = new Blog({ ...request.body, user: user._id });

    user.blogs = user.blogs.concat(blog._id);
    await user.save();

    const result = await blog.save();

    response.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

blogsRouter.put('/:id', async (request, response, next) => {
  const { id } = request.params;
  try {
    const result = await Blog.findByIdAndUpdate(id, request.body, {
      new: true,
    });
    response.json(result);
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete(
  '/:id',
  getToken,
  getUser,
  async (request, response, next) => {
    const { id } = request.params;
    try {
      const blog = await Blog.findById(id);
      if (!(blog.user.toString() === request.userId.toString())) {
        return response.status(403).json({ error: 'Access denied' });
      }

      await Blog.findByIdAndDelete(id);

      response.status(204).end();
    } catch (error) {
      next(error);
    }
  }
);

module.exports = blogsRouter;
