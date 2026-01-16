 const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["student", "teacher"],
      default: "student",
    },
    subjects: {
    type: [String], // array for future use
  default: []
},

    // ---------- STUDENT DETAILS ----------
    usn: {
      type: String,
      trim: true,
    },
    branch: {
      type: String,
      trim: true,
    },
    year: {
      type: String,
      trim: true,
    },
    semester: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
