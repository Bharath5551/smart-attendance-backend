const User = require("../models/User");
const Attendance = require("../models/Attendance");

/* ================= ADD STUDENT ================= */

exports.addStudent = async (req, res) => {
  try {
    const { name, email, password, usn, branch, year, semester } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Student already exists" });
    }

    const bcrypt = require("bcryptjs");
    const hashed = await bcrypt.hash(password, 10);

    const student = await User.create({
      name,
      email,
      password: hashed,
      role: "student",
      usn,
      branch,
      year,
      semester
    });

    res.status(201).json(student);
  } catch (err) {
    console.error("ADD STUDENT ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= DELETE STUDENT ================= */

exports.deleteStudent = async (req, res) => {
  try {
    const studentId = req.params.id;

    await Attendance.deleteMany({ studentId });
    await User.findByIdAndDelete(studentId);

    res.json({ message: "Student deleted" });
  } catch (err) {
    console.error("DELETE STUDENT ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= GET STUDENTS ================= */

exports.getStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "student" }).select("-password");
    res.json(students);
  } catch (err) {
    console.error("GET STUDENTS ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};
