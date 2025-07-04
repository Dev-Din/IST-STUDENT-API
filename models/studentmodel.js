import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "First name is required"],
  },
  lastname: {
    type: String,
    required: [true, "Last name is required"],
  },
  gender: {
    type: String,
  },
});

const Student = mongoose.model("Student", studentSchema);

export default Student;
