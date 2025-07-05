// routes/api.js
import express from "express";
import {
  addStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} from "../controllers/studentController.js";
import { authenticateToken } from "../middleware/auth.js";

const routes = express.Router();

// Apply authentication middleware to all student routes
routes.use(authenticateToken);

// Create
routes.post("/addStudent", addStudent);

// Read all
routes.get("/getAllStudents", getAllStudents);

// Read one
routes.get("/getStudent/:id", getStudentById);

// Update
routes.patch("/updateStudent/:id", updateStudent);

// Delete
routes.delete("/deleteStudent/:id", deleteStudent);

export default routes;
