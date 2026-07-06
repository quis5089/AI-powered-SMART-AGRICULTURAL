/**
 * models/Otp.js
 * Schema to hold temporary 4-digit verification codes.
 * Uses MongoDB TTL (Time To Live) indexing to auto-delete codes after 5 minutes (300 seconds).
 */
const mongoose = require("mongoose");

const OtpSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    otp: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 300, // Auto-delete document after 300 seconds (5 minutes)
    },
  }
);

// Ensure index exists
OtpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 });

module.exports = mongoose.model("Otp", OtpSchema);
