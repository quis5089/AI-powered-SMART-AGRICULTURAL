/**
 * utils/generateToken.js
 * Creates a signed JWT and optionally sets it as an HttpOnly cookie.
 * Future: Support refresh tokens stored in Redis/DB.
 */
const jwt = require('jsonwebtoken');

/**
 * Generate a JWT for a given user ID and role.
 * @param {string} id - MongoDB user _id
 * @param {string} role - User role (farmer|buyer|admin|expert)
 * @returns {string} Signed JWT string
 */
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });
};

/**
 * Send JWT as an HttpOnly cookie AND in the response body.
 * @param {object} res - Express response object
 * @param {string} token - JWT string
 */
const sendTokenCookie = (res, token) => {
  const options = {
    expires: new Date(
      Date.now() + (process.env.JWT_COOKIE_EXPIRE || 7) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,           // Not accessible via JS (XSS protection)
    secure: process.env.NODE_ENV === 'production', // HTTPS only in prod
    sameSite: 'strict',       // CSRF protection
  };
  res.cookie('agri_token', token, options);
};

module.exports = { generateToken, sendTokenCookie };
