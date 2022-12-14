const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      required: true,
      unique: true,
    },
    studentName: {
      type: String,
      required: true,
    },
    studentCollege: {
      type: String,
      required: true,
    },
    placed_status: {
      type: Boolean,
      required: true,
    },
    DSA_score: {
      type: Number,
      required: true,
    },
    WebD_score: {
      type: Number,
      required: true,
    },
    React_score: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
