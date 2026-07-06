/**
 * models/User.js
 * Mongoose User Schema for the AgriEcosystem platform.
 * Supports 4 roles: farmer, buyer, admin, expert.
 * Passwords are hashed via bcrypt before saving.
 * Future: extend with cropTypes[], landHoldings, kycStatus, etc.
 */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema(
  {
    // ---------- Identity ----------
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },

    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },

    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      unique: true,
      trim: true,
      match: [/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian mobile number'],
    },

    // ---------- Security ----------
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters'],
      select: false, // Never return password in queries by default
    },

    // ---------- Role ----------
    role: {
      type: String,
      enum: {
        values: ['farmer', 'buyer', 'admin', 'expert'],
        message: 'Role must be one of: farmer, buyer, admin, expert',
      },
      default: 'farmer',
    },

    // ---------- Profile ----------
    profilePhoto: {
      type: String,
      default: null, // URL to uploaded photo (S3/Cloudinary in future)
    },

    state: {
      type: String,
      trim: true,
      default: null,
    },

    district: {
      type: String,
      trim: true,
      default: null,
    },

    preferredLanguage: {
      type: String,
      enum: ['English', 'Hindi', 'Punjabi', 'Marathi', 'Telugu', 'Kannada', 'Tamil', 'Bengali'],
      default: 'English',
    },

    // ---------- Auth Tokens (for logout / reset) ----------
    passwordResetToken: {
      type: String,
      default: null,
    },

    passwordResetExpire: {
      type: Date,
      default: null,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

// --- Pre-save Middleware: Hash password before saving -------------------------
UserSchema.pre('save', async function (next) {
  // Only hash if password field was modified
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// --- Instance Method: Compare entered password with hashed password ------------
UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
