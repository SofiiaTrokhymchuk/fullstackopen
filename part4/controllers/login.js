const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/user');

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username });

  const credentialsCorrect = !user
    ? false
    : await bcrypt.compare(password, user.passwordHash);

  if (!credentialsCorrect) {
    return response.status(401).json({
      error: 'Invalid username or password',
    });
  }

  const tokenData = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(tokenData, process.env.SECRET, { expiresIn: 60 * 60 });

  response.json({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
