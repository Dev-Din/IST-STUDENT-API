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
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true
}));

// Middleware to parse JSON requests
app.use(express.json());

// Mount user routes before error handling
app.use("/api", userroutes);

// Mount student routes
app.use("/api", studentsRoutes);

// Catch unknown routes
app.use((req, res, next) => {
  next(createError(404, "Route not found"));
});

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
  console.log(`Now serving requests on: http://localhost:4000`);
});
