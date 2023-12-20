const logger = require('./logger');
const jwt = require('jsonwebtoken');

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
    CastError: { status: 400, error: 'Malformatted ID' },
    ValidationError: { status: 400, error: error.message },
    ServerError: { status: 500, error: 'Internal Server Error' },
    JsonWebTokenError: { status: 401, error: 'Invalid token' },
    TokenExpiredError: { status: 401, error: 'Token expired' },
  };

  const customError = errors[error.name] || errors['ServerError'];
  response.status(customError.status).json({ error: customError.error });

  next(error);
};

const getToken = (request, response, next) => {
  const auth = request.get('authorization');
  if (auth && auth.startsWith('Bearer')) {
    request.token = auth.split(' ')[1];
  } else {
    return response.status(401).json({ error: 'Invalid token' });
  }

  next();
};

const getUser = async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'Invalid token' });
  }

  request.userId = decodedToken.id;
  next();
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  getToken,
  getUser,
};
