// index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import studentsRoutes from "./routes/api.js";
import userroutes from "./routes/userroutes.js";
import "./helpers/init-mongodb.js";
import createError from "http-errors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));

// Mount user routes before error handling
app.use("/api", userroutes);

// Mount student routes
app.use("/api", studentsRoutes);

// Serve the main HTML file for all non-API routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
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
  console.log(`Frontend available at: http://localhost:4000`);
});
