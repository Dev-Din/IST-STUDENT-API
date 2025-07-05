// routes/api.js
import express from "express";
import {
  addStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} from "../controllers/studentController.js";
import { changePassword } from "../controllers/userController.js";
import { authenticateToken } from "../middleware/auth.js";

const routes = express.Router();

// Apply authentication middleware to all protected routes
routes.use(authenticateToken);

// Student routes (RESTful)
routes.post("/students", addStudent); // Create
routes.get("/students", getAllStudents); // Read all
routes.get("/students/:id", getStudentById); // Read one
routes.put("/students/:id", updateStudent); // Update
routes.delete("/students/:id", deleteStudent); // Delete

// User routes
routes.post("/change-password", changePassword);

export default routes;
