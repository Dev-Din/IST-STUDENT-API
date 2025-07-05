import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
    },
    email: {
      type: String,
      required: false,
    },
    gender: {
      type: String,
      required: false,
    },
    age: {
      type: Number,
      required: false,
    },
    course: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true, // Add createdAt and updatedAt timestamps
  }
);

const Student = mongoose.model("Student", studentSchema);

export default Student;
