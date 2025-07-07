// index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import studentsRoutes from "./routes/api.js";
import userroutes from "./routes/userroutes.js";
import "./helpers/init-mongodb.js";
import createError from "http-errors";

dotenv.config();

const app = express();

// CORS configuration
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"], // React development server
    credentials: true,
  })
);

// Middleware to parse JSON requests
app.use(express.json());

// Mount user routes before error handling
app.use("/api", userroutes);

// Mount student routes
app.use("/api", studentsRoutes);

// Global error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: {
      status: err.status || 500,
      message: err.message || "Internal Server Error",
    },
  });
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API Server running on: http://localhost:${PORT}`);
  console.log(`React Frontend available at: http://localhost:3000`);
});
