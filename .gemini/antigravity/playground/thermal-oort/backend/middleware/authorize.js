/**
 * middleware/authorize.js
 * Role-Based Authorization Middleware.
 * Usage: authorize('admin', 'expert') — only admin and expert can proceed.
 * Must be used AFTER the protect middleware.
 */
const { sendError } = require('../utils/apiResponse');

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return sendError(
        res,
        403,
        Access forbidden. Role '' is not authorized to perform this action.
      );
    }
    next();
  };
};

module.exports = authorize;
