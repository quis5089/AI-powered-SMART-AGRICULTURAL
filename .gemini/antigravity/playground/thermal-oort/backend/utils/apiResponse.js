/**
 * utils/apiResponse.js
 * Standardized API response helpers.
 * All responses follow: { success, message, data, token }
 */

const sendSuccess = (res, statusCode, message, data = null, token = null) => {
  const response = { success: true, message };
  if (data !== null) response.data = data;
  if (token !== null) response.token = token;
  return res.status(statusCode).json(response);
};

const sendError = (res, statusCode, message, errors = null) => {
  const response = { success: false, message };
  if (errors !== null) response.errors = errors;
  return res.status(statusCode).json(response);
};

module.exports = { sendSuccess, sendError };
