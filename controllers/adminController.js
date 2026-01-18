const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Subject = require("../models/Subject");

/* ================= TEACHERS ================= */

exports.createTeacher = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    const teacher = await User.create({
      name,
      email,
      password: hashed,
      role: "teacher"
    });

    res.json({ teacher });
  } catch (err) {
    console.error("CREATE TEACHER ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllTeachers = async (req, res) => {
  try {
    const teachers = await User.find({ role: "teacher" }).select("-password");
    res.json(teachers);
  } catch (err) {
    console.error("GET TEACHERS ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteTeacher = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    await Subject.deleteMany({ facultyId: req.params.id });
    res.json({ message: "Teacher deleted" });
  } catch (err) {
    console.error("DELETE TEACHER ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= SUBJECTS ================= */

exports.createSubjectForTeacher = async (req, res) => {
  try {
    const { name, code, teacherId } = req.body;

    const subject = await Subject.create({
      name,
      code,
      facultyId: new mongoose.Types.ObjectId(teacherId)
    });

    res.json(subject);
  } catch (err) {
    console.error("CREATE SUBJECT ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getSubjectsByTeacher = async (req, res) => {
  try {
    const teacherId = new mongoose.Types.ObjectId(req.params.id);

    const subjects = await Subject.find({ facultyId: teacherId });

    res.json(subjects);
  } catch (err) {
    console.error("GET SUBJECTS ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteSubject = async (req, res) => {
  try {
    await Subject.findByIdAndDelete(req.params.id);
    res.json({ message: "Subject deleted" });
  } catch (err) {
    console.error("DELETE SUBJECT ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};
