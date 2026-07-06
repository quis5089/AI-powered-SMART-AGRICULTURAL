/**
 * server.js
 * Entry point for the AgriEcosystem backend server.
 * - Loads environment variables from .env
 * - Connects to MongoDB
 * - Starts the Express HTTP server
 * - Handles uncaught exceptions and unhandled rejections gracefully
 */
const dotenv = require("dotenv");
dotenv.config();                    // Must be before any other imports that use env vars

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";

// --- Connect to MongoDB then start server ------------------------------------
connectDB().then(() => {
  const server = app.listen(PORT, () => {
    console.log("============================================");
    console.log(`  AgriEcosystem API Server`);
    console.log(`  Environment : ${NODE_ENV}`);
    console.log(`  Port        : ${PORT}`);
    console.log(`  Health      : http://localhost:${PORT}/api/health`);
    console.log("============================================");
  });

  // --- Graceful shutdown on unhandled promise rejections ---------------------
  process.on("unhandledRejection", (err) => {
    console.error("[FATAL] Unhandled Rejection:", err.message);
    server.close(() => process.exit(1));
  });
});

// --- Handle uncaught synchronous exceptions -----------------------------------
process.on("uncaughtException", (err) => {
  console.error("[FATAL] Uncaught Exception:", err.message);
  process.exit(1);
});
