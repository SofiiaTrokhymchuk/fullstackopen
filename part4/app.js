const db = require('./db');
const middleware = require('./utils/middleware');
const blogsRouter = require('./controllers/blogs');
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

db.connect();

app.use('/api/blogs', blogsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
