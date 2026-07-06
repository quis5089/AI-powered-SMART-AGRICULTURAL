/**
 * app.js
 * Express application setup for the AgriEcosystem Backend.
 *
 * Middleware stack (in order):
 *  1. Helmet       — Security headers
 *  2. CORS         — Allow frontend origin
 *  3. Rate Limiter — Prevent brute-force on auth endpoints
 *  4. Body Parsers — JSON + URL-encoded
 *  5. Cookie Parser — Read HttpOnly cookies
 *  6. Routes       — Auth (and future feature routes)
 *  7. 404 Handler
 *  8. Global Error Handler
 *
 * Future Routes to mount here:
 *   /api/crops       — Disease detection, price prediction
 *   /api/marketplace — Farmer-buyer listings
 *   /api/schemes     — Govt scheme discovery
 *   /api/logistics   — Delivery & tracking
 *   /api/chat        — AI chatbot sessions
 *   /api/expert      — Expert advisory module
 *   /api/admin       — Admin telemetry and control
 */
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middleware/errorHandler");
const { sendError } = require("./utils/apiResponse");

const app = express();

// --- 1. Security Headers (Helmet) --------------------------------------------
app.use(helmet());

// --- 2. CORS -----------------------------------------------------------------
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,             // Allow cookies to be sent cross-origin
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// --- 3. Global Rate Limiter (100 req / 15 min per IP) ------------------------
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many requests from this IP. Please try again after 15 minutes." },
});

// Strict limiter for auth endpoints (10 req / 15 min)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many login attempts. Please try again after 15 minutes." },
});

app.use(globalLimiter);

// --- 4. Body Parsers ---------------------------------------------------------
app.use(express.json({ limit: "10kb" }));         // Limit body size to prevent payload attacks
app.use(express.urlencoded({ extended: true }));

// --- 5. Cookie Parser --------------------------------------------------------
app.use(cookieParser());

// --- 6. Health Check Route ---------------------------------------------------
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "AgriEcosystem API is running.",
    version: "1.0.0",
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// --- 7. API Routes -----------------------------------------------------------
app.use("/api/auth", authLimiter, authRoutes);

// Future feature modules (stub — uncomment as features are built):
// app.use("/api/crops",       require("./routes/cropRoutes"));
// app.use("/api/marketplace", require("./routes/marketRoutes"));
// app.use("/api/schemes",     require("./routes/schemeRoutes"));
// app.use("/api/logistics",   require("./routes/logisticsRoutes"));
// app.use("/api/chat",        require("./routes/chatRoutes"));
// app.use("/api/expert",      require("./routes/expertRoutes"));
// app.use("/api/admin",       require("./routes/adminRoutes"));

// --- 8. 404 Handler ----------------------------------------------------------
app.use((req, res) => {
  sendError(res, 404, `Route ${req.method} ${req.originalUrl} not found.`);
});

// --- 9. Global Error Handler (must be last) -----------------------------------
app.use(errorHandler);

module.exports = app;
