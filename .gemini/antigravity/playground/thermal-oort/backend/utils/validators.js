/**
 * utils/validators.js
 * express-validator rules for each auth route.
 * Keeps controller logic clean and validation centralized.
 */
const { body, validationResult } = require('express-validator');
const { sendError } = require('./apiResponse');

// --- Registration Validation Rules --------------------------------------------
const registerRules = [
  body('fullName')
    .trim()
    .notEmpty().withMessage('Full name is required')
    .isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),

  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please enter a valid email'),

  body('phone')
    .trim()
    .notEmpty().withMessage('Phone number is required')
    .matches(/^[6-9]\d{9}$/).withMessage('Enter a valid 10-digit Indian mobile number'),

  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
    .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
    .matches(/\d/).withMessage('Password must contain at least one number')
    .matches(/[@$!%*?&#^]/).withMessage('Password must contain at least one special character (@$!%*?&#^)'),

  body('role')
    .optional()
    .isIn(['farmer', 'buyer', 'admin', 'expert']).withMessage('Role must be farmer, buyer, admin, or expert'),
];

// --- Login Validation Rules ----------------------------------------------------
const loginRules = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please enter a valid email'),

  body('password')
    .notEmpty().withMessage('Password is required'),
];

// --- Forgot Password Rules -----------------------------------------------------
const forgotPasswordRules = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please enter a valid email'),
];

// --- Reset Password Rules ------------------------------------------------------
const resetPasswordRules = [
  body('password')
    .notEmpty().withMessage('New password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/[A-Z]/).withMessage('Must contain uppercase letter')
    .matches(/[a-z]/).withMessage('Must contain lowercase letter')
    .matches(/\d/).withMessage('Must contain a number')
    .matches(/[@$!%*?&#^]/).withMessage('Must contain a special character'),
];

// --- Update Profile Rules ------------------------------------------------------
const updateProfileRules = [
  body('fullName').optional().trim().isLength({ min: 2 }).withMessage('Name too short'),
  body('phone').optional().matches(/^[6-9]\d{9}$/).withMessage('Invalid phone number'),
  body('preferredLanguage').optional().isIn(['English','Hindi','Punjabi','Marathi','Telugu','Kannada','Tamil','Bengali']),
];

// --- Middleware: Validate and respond if errors found -------------------------
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formatted = errors.array().map(e => ({ field: e.path, message: e.msg }));
    return sendError(res, 422, 'Validation failed', formatted);
  }
  next();
};

module.exports = {
  registerRules,
  loginRules,
  forgotPasswordRules,
  resetPasswordRules,
  updateProfileRules,
  validate,
};
