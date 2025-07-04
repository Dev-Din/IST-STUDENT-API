// routes/api.js
import express from "express";
import {
  addStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent
} from "../controllers/studentController.js";

const routes = express.Router();

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
