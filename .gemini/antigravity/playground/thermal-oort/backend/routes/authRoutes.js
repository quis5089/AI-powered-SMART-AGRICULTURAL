/**
 * routes/authRoutes.js
 * All authentication API routes for AgriEcosystem.
 *
 * Public Routes:
 *   POST   /api/auth/register
 *   POST   /api/auth/login
 *   POST   /api/auth/logout
 *   POST   /api/auth/forgot-password
 *   POST   /api/auth/reset-password/:resetToken
 *
 * Protected Routes (require valid JWT):
 *   GET    /api/auth/profile
 *   PUT    /api/auth/profile
 *
 * Future Route Stubs (commented):
 *   POST   /api/auth/verify-otp
 *   POST   /api/auth/refresh-token
 *   DELETE /api/auth/delete-account
 */
const express = require("express");
const router = express.Router();

const {
  register, login, logout,
  getProfile, updateProfile,
  forgotPassword, resetPassword,
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");
// const authorize = require("../middleware/authorize"); // Use for role-gating specific routes

const {
  registerRules, loginRules, forgotPasswordRules,
  resetPasswordRules, updateProfileRules, validate,
} = require("../utils/validators");

// --- Public Routes ------------------------------------------------------------
router.post("/register",        registerRules,        validate, register);
router.post("/login",           loginRules,           validate, login);
router.post("/logout",          logout);
router.post("/forgot-password", forgotPasswordRules,  validate, forgotPassword);
router.post("/reset-password/:resetToken", resetPasswordRules, validate, resetPassword);

// --- Protected Routes ---------------------------------------------------------
router.get ("/profile", protect, getProfile);
router.put ("/profile", protect, updateProfileRules, validate, updateProfile);

// --- Future Module Route Stubs ------------------------------------------------
// router.post("/verify-otp",     protect, verifyOtp);
// router.post("/refresh-token",  refreshToken);
// router.delete("/account",      protect, deleteAccount);

module.exports = router;
