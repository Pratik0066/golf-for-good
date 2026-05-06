import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import connectDB from "./config/db.js";

// --- ROUTE IMPORTS ---
import authRoutes from "./routes/authRoutes.js";
import scoreRoutes from "./routes/scoreRoutes.js";
import drawRoutes from "./routes/drawRoutes.js";
import winnerRoutes from "./routes/winnerRoutes.js"; // 💡 PRD Section 09: Winner Verification
import payoutRoutes from "./routes/payoutRoutes.js"; // 💡 PRD Section 11: Payout Tracking
import adminRoutes from "./routes/adminRoutes.js";
import charityRoutes from "./routes/charityRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import leaderboardRoutes from "./routes/leaderboardRoutes.js";
import stripeRoutes from "./routes/stripeRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";

// Connect to MongoDB
connectDB();

const app = express();

// --- MIDDLEWARE ---
app.use(helmet()); 
app.use(cors());   

/**
 * 💡 STRIPE WEBHOOK PRD RULE (Section 04): 
 * The webhook route MUST come before express.json() to maintain raw body for signature check[cite: 39, 57].
 */
app.use("/api/stripe/webhook", express.raw({ type: "application/json" })); 

app.use(express.json()); // Body parser for all other JSON routes

// --- HEALTH CHECK ---
app.get("/health", (req, res) => {
  res.status(200).json({ status: "active", uptime: process.uptime() });
});

// --- API ROUTES ---
// PRD Section 04: Authentication & Subscription Lifecycle
app.use("/api/auth", authRoutes);
app.use("/api/stripe", stripeRoutes);
app.use("/api/transactions", transactionRoutes);

// PRD Section 05 & 10: Score Management & Dashboard
app.use("/api/scores", scoreRoutes);
app.use("/api/user", dashboardRoutes);
app.use("/api/leaderboard", leaderboardRoutes);

// PRD Section 06, 07 & 09: Draw Engine & Winner Verification
app.use("/api/draw", drawRoutes);
app.use("/api/winners", winnerRoutes);

// PRD Section 08: Charity Directory[cite: 39, 52]
app.use("/api/charity", charityRoutes);
app.use("/uploads", express.static("uploads"));

// PRD Section 11: Admin Control & Payouts[cite: 39, 52]
app.use("/api/admin", adminRoutes);
app.use("/api/payouts", payoutRoutes);

// --- GLOBAL ERROR HANDLER ---
// Catches all unhandled errors to prevent server crashes and provide PRD-required stability[cite: 39, 57]
app.use((err, req, res, next) => {
  console.error("🔥 SERVER ERROR:", err.stack); 
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

// --- SERVER INITIALIZATION ---
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`
  🚀 GolfForGood Engine Running in ${process.env.NODE_ENV || 'development'} mode
  📡 URL: http://localhost:${PORT}
  🛠️  Health: http://localhost:${PORT}/health
  `);
});

// Handle Unhandled Promise Rejections (e.g. DB connection issues)
process.on("unhandledRejection", (err) => {
  console.log(`Unhandled Rejection: ${err.message}`);
  server.close(() => process.exit(1));
});