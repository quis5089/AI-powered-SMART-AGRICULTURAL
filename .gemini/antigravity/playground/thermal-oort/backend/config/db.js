/**
 * config/db.js
 * MongoDB connection using Mongoose.
 * Handles connection retries and logs connection status.
 * Future: Can be extended with replica set or Atlas URI configuration.
 */
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log([DB] MongoDB Connected: );
  } catch (error) {
    console.error([DB] Connection Error: );
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
