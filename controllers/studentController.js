import Student from "../models/studentmodel.js";
import createError from "http-errors";
import mongoose from "mongoose";

// Create
export const addStudent = async (req, res, next) => {
  try {
    const student = new Student(req.body);
    const result = await student.save();
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    next(createError(500, "Failed to add student"));
  }
};

// Read all
export const getAllStudents = async (req, res, next) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    console.error(error);
    next(createError(500, "Failed to fetch students"));
  }
};

// Read one
export const getStudentById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const student = await Student.findById(id);
    if (!student) {
      return next(createError(404, "Student not found"));
    }
    res.status(200).json(student);
  } catch (error) {
    console.error(error.message);
    if (error instanceof mongoose.Error.CastError) {
      return next(createError(400, "Invalid student ID"));
    }
    next(createError(500, "Server error while fetching student"));
  }
};

// Update
export const updateStudent = async (req, res, next) => {
  const { id } = req.params;
  try {
    const updated = await Student.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) {
      return next(createError(404, "Student not found"));
    }
    res.status(200).json(updated);
  } catch (error) {
    console.error(error.message);
    if (error instanceof mongoose.Error.CastError) {
      return next(createError(400, "Invalid student ID"));
    }
    next(createError(500, "Server error while updating student"));
  }
};

// Delete
export const deleteStudent = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deleted = await Student.findByIdAndDelete(id);
    if (!deleted) {
      return next(createError(404, "Student not found"));
    }
    res.status(200).json(deleted);
  } catch (error) {
    console.error(error.message);
    if (error instanceof mongoose.Error.CastError) {
      return next(createError(400, "Invalid student ID"));
    }
    next(createError(500, "Server error while deleting student"));
  }
};
