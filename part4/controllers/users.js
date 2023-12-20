const usersRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const { ValidationError } = require('mongoose').Error;

usersRouter.get('/', async (request, response, next) => {
  try {
    const users = await User.find({}).populate('blogs', {
      url: 1,
      title: 1,
      author: 1,
      id: 1,
    });
    response.json(users);
  } catch (error) {
    next(error);
  }
});

usersRouter.post('/', async (request, response, next) => {
  try {
    const { username, name, password } = request.body;

    if (password.length < 3) {
      const error = new ValidationError();
      error.message = 'Password must be at least 3 characters long';
      throw error;
    }

    const salt = 10;
    const passwordHash = await bcrypt.hash(password, salt);

    const user = new User({ username, name, passwordHash });
    const savedUser = await user.save();

    response.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
