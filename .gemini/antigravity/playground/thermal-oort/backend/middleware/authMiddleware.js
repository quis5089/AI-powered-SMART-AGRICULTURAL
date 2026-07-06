/**
 * middleware/authMiddleware.js
 * JWT Authentication Middleware.
 * Accepts token from: Authorization header (Bearer) OR HttpOnly cookie.
 * Attaches decoded user info to req.user for downstream controllers.
 */
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendError } = require('../utils/apiResponse');

const protect = async (req, res, next) => {
  let token;

  // 1. Check Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }
  // 2. Fall back to HttpOnly cookie
  else if (req.cookies && req.cookies.agri_token) {
    token = req.cookies.agri_token;
  }

  if (!token) {
    return sendError(res, 401, 'Access denied. No token provided. Please log in.');
  }

  try {
    // Verify JWT signature and expiry
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach live user doc (excluding password) to request
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      return sendError(res, 401, 'User belonging to this token no longer exists.');
    }

    if (!req.user.isActive) {
      return sendError(res, 403, 'Your account has been deactivated. Please contact support.');
    }

    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return sendError(res, 401, 'Your session has expired. Please log in again.');
    }
    return sendError(res, 401, 'Invalid token. Please log in again.');
  }
};

module.exports = protect;
