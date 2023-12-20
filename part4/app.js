const db = require('./db');
const middleware = require('./utils/middleware');
const blogsRouter = require('./controllers/blogs');
const express = require('express');
const app = express();
const cors = require('cors');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

db.connect();

app.use(middleware.getToken);

app.use('/api/blogs', middleware.getUser, blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
