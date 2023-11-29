const logger = require('./logger');

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method);
  logger.info('Path:  ', request.path);
  logger.info('Body:  ', request.body);
  logger.info('---');
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'Unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  const errors = {
    CastError: { status: 400, message: 'Malformatted ID' },
    ValidationError: { status: 400, error: error.message },
    ServerError: { status: 500, message: 'Internal Server Error' },
  };

  const customError = errors[error.name] || errors['ServerError'];
  response.status(customError.status).json(customError.message);

  next(error);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
};
