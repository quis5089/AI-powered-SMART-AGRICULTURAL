/**
 * middleware/errorHandler.js
 * Global error handler — catches all unhandled errors in Express.
 * Maps Mongoose errors, JWT errors, and custom errors to clean HTTP responses.
 */
const { sendError } = require('../utils/apiResponse');

const errorHandler = (err, req, res, next) => {
  console.error('[ERROR]', err.stack || err.message);

  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // Mongoose: Invalid ObjectId (CastError)
  if (err.name === 'CastError') {
    statusCode = 400;
    message = Invalid : ;
  }

  // Mongoose: Duplicate key violation (e.g., duplicate email or phone)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    statusCode = 409;
    message = An account with this  already exists.;
  }

  // Mongoose: Validation error
  if (err.name === 'ValidationError') {
    statusCode = 422;
    const errors = Object.values(err.errors).map(e => ({ field: e.path, message: e.message }));
    return sendError(res, statusCode, 'Validation failed', errors);
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token. Please log in again.';
  }
  if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Session expired. Please log in again.';
  }

  return sendError(res, statusCode, message);
};

module.exports = errorHandler;
