// helpers/jwtHelper.js

import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key_here";
const JWT_EXPIRES_IN = "1d"; // Token expires in 1 day

// Generate JWT Token
export const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

// Verify JWT Token
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    // More specific error handling for different types of JWT errors
    if (error.name === "TokenExpiredError") {
      throw new Error("Token has expired");
    } else if (error.name === "JsonWebTokenError") {
      throw new Error("Invalid token - possible tampering detected");
    } else if (error.name === "NotBeforeError") {
      throw new Error("Token not active yet");
    } else {
      throw new Error("Token verification failed");
    }
  }
};

// Additional security function: Decode token without verification (for debugging)
export const decodeToken = (token) => {
  try {
    return jwt.decode(token);
  } catch (error) {
    throw new Error("Unable to decode token");
  }
};

// Check if token is expired without verification
export const isTokenExpired = (token) => {
  try {
    const decoded = jwt.decode(token);
    if (!decoded || !decoded.exp) return true;

    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  } catch (error) {
    return true; // If we can't decode, consider it expired/invalid
  }
};
