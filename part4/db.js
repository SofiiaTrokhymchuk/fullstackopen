const config = require('./utils/config');
const logger = require('./utils/logger');
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB at', new Date());
});

mongoose.connection.on('disconnected', () => {
  console.log('Disonnected from MongoDB at', new Date());
});

const connect = () => {
  return mongoose
    .connect(config.MONGODB_URI)
    .then(() => logger.info('Connection to MongoDB is created'))
    .catch((e) => logger.error('Connection to MongoDB failed', e));
};

const disconnect = () => {
  return mongoose.connection
    .close()
    .then(() => logger.info('Connection to MongoDB is closed'))
    .catch((e) => logger.error('Closing MongoDB connection failed', e));
};

module.exports = { connect, disconnect };
