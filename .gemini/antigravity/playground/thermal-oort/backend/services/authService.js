/**
 * services/authService.js
 * Business logic layer for authentication operations.
 * Controllers call these - keeping controllers thin and clean.
 * Future: Add email service (nodemailer), OTP, 2FA support here.
 */
const crypto = require("crypto");
const User = require("../models/User");
const { generateToken } = require("../utils/generateToken");

const registerUser = async ({ fullName, email, phone, password, role, state, district, preferredLanguage }) => {
  const emailExists = await User.findOne({ email: email.toLowerCase() });
  if (emailExists) {
    const err = new Error("An account with this email already exists.");
    err.statusCode = 409; throw err;
  }
  const phoneExists = await User.findOne({ phone });
  if (phoneExists) {
    const err = new Error("An account with this phone number already exists.");
    err.statusCode = 409; throw err;
  }
  const user = await User.create({ fullName, email: email.toLowerCase(), phone, password, role: role || "farmer", state, district, preferredLanguage });
  const token = generateToken(user._id, user.role);
  return { user: sanitizeUser(user), token };
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
  if (!user) { const err = new Error("Invalid email or password."); err.statusCode = 401; throw err; }
  if (!user.isActive) { const err = new Error("Account deactivated. Contact support."); err.statusCode = 403; throw err; }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) { const err = new Error("Invalid email or password."); err.statusCode = 401; throw err; }
  const token = generateToken(user._id, user.role);
  return { user: sanitizeUser(user), token };
};

const getUserProfile = async (userId) => {
  const user = await User.findById(userId);
  if (!user) { const err = new Error("User not found."); err.statusCode = 404; throw err; }
  return sanitizeUser(user);
};

const updateUserProfile = async (userId, updates) => {
  const allowed = ["fullName", "phone", "state", "district", "preferredLanguage", "profilePhoto"];
  const filtered = {};
  allowed.forEach(f => { if (updates[f] !== undefined) filtered[f] = updates[f]; });
  if (filtered.phone) {
    const exists = await User.findOne({ phone: filtered.phone, _id: { $ne: userId } });
    if (exists) { const err = new Error("Phone already in use."); err.statusCode = 409; throw err; }
  }
  const user = await User.findByIdAndUpdate(userId, filtered, { new: true, runValidators: true });
  if (!user) { const err = new Error("User not found."); err.statusCode = 404; throw err; }
  return sanitizeUser(user);
};

const forgotPassword = async (email) => {
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) return true;
  const resetToken = crypto.randomBytes(32).toString("hex");
  user.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  user.passwordResetExpire = Date.now() + 15 * 60 * 1000;
  await user.save({ validateBeforeSave: false });
  console.log("[AUTH] Password reset token for", email, ":", resetToken);
  return true;
};

const resetPassword = async (resetToken, newPassword) => {
  const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  const user = await User.findOne({ passwordResetToken: hashedToken, passwordResetExpire: { $gt: Date.now() } });
  if (!user) { const err = new Error("Reset token is invalid or expired."); err.statusCode = 400; throw err; }
  user.password = newPassword;
  user.passwordResetToken = null;
  user.passwordResetExpire = null;
  await user.save();
  const token = generateToken(user._id, user.role);
  return { user: sanitizeUser(user), token };
};

const sanitizeUser = (user) => ({
  _id: user._id, fullName: user.fullName, email: user.email, phone: user.phone,
  role: user.role, profilePhoto: user.profilePhoto, state: user.state,
  district: user.district, preferredLanguage: user.preferredLanguage,
  isActive: user.isActive, createdAt: user.createdAt, updatedAt: user.updatedAt,
});

module.exports = { registerUser, loginUser, getUserProfile, updateUserProfile, forgotPassword, resetPassword };
