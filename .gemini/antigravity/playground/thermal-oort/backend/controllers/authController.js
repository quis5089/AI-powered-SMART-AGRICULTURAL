/**
 * controllers/authController.js
 * Thin controller layer � delegates all logic to authService.
 * Handles HTTP req/res, calls service, sends standardized responses.
 * Future: Add rate-limit-per-user, audit logs, activity tracking here.
 */
const authService = require("../services/authService");
const { sendSuccess, sendError } = require("../utils/apiResponse");
const { sendTokenCookie } = require("../utils/generateToken");

// POST /api/auth/register
const register = async (req, res, next) => {
  try {
    const { user, token } = await authService.registerUser(req.body);
    sendTokenCookie(res, token);
    return sendSuccess(res, 201, "Account registered successfully. Welcome to AgriEcosystem!", user, token);
  } catch (err) { next(err); }
};

// POST /api/auth/login
const login = async (req, res, next) => {
  try {
    const { user, token } = await authService.loginUser(req.body);
    sendTokenCookie(res, token);
    return sendSuccess(res, 200, `Welcome back, ${user.fullName}!`, user, token);
  } catch (err) { next(err); }
};

// POST /api/auth/logout
const logout = async (req, res, next) => {
  try {
    res.cookie("agri_token", "none", { expires: new Date(Date.now() + 5 * 1000), httpOnly: true });
    return sendSuccess(res, 200, "Logged out successfully.");
  } catch (err) { next(err); }
};

// GET /api/auth/profile  (protected)
const getProfile = async (req, res, next) => {
  try {
    const user = await authService.getUserProfile(req.user._id);
    return sendSuccess(res, 200, "Profile fetched successfully.", user);
  } catch (err) { next(err); }
};

// PUT /api/auth/profile  (protected)
const updateProfile = async (req, res, next) => {
  try {
    const user = await authService.updateUserProfile(req.user._id, req.body);
    return sendSuccess(res, 200, "Profile updated successfully.", user);
  } catch (err) { next(err); }
};


// POST /api/auth/send-otp
const sendOtpCode = async (req, res, next) => {
  try {
    const { phone } = req.body;
    if (!phone) {
      return sendError(res, 400, "Phone number is required.");
    }
    const result = await authService.sendOtp(phone);
    return sendSuccess(res, 200, "OTP verification code sent successfully.", result);
  } catch (err) { next(err); }
};

// POST /api/auth/verify-otp
const verifyOtpCode = async (req, res, next) => {
  try {
    const { phone, otp } = req.body;
    if (!phone || !otp) {
      return sendError(res, 400, "Phone number and OTP code are required.");
    }
    const { user, token } = await authService.verifyOtp(phone, otp);
    sendTokenCookie(res, token);
    return sendSuccess(res, 200, "OTP verified successfully. Logged in.", user, token);
  } catch (err) { next(err); }
};

// POST /api/auth/forgot-password
const forgotPassword = async (req, res, next) => {
  try {
    await authService.forgotPassword(req.body.email);
    return sendSuccess(res, 200, "If this email exists, a password reset link has been sent. Check your inbox.");
  } catch (err) { next(err); }
};

// POST /api/auth/reset-password/:resetToken
const resetPassword = async (req, res, next) => {
  try {
    const { user, token } = await authService.resetPassword(req.params.resetToken, req.body.password);
    sendTokenCookie(res, token);
    return sendSuccess(res, 200, "Password reset successfully. You are now logged in.", user, token);
  } catch (err) { next(err); }
};

module.exports = { register, login, logout, getProfile, updateProfile, forgotPassword, resetPassword, sendOtpCode, verifyOtpCode };
