const mongoose = require("mongoose");
const User = require("../models/User");
const Subject = require("../models/Subject");
const bcrypt = require("bcryptjs");

/* ================= CREATE TEACHER ================= */

exports.createTeacher = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const teacher = await User.create({
      name,
      email,
      password: hashed,
      role: "teacher"
    });

    res.status(201).json({
      message: "Teacher created",
      teacher
    });
  } catch (err) {
    console.error("CREATE TEACHER ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= GET ALL TEACHERS ================= */

exports.getAllTeachers = async (req, res) => {
  try {
    const teachers = await User.find({ role: "teacher" }).select("-password");
    res.json(teachers);
  } catch (err) {
    console.error("GET TEACHERS ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= DELETE TEACHER ================= */

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

/* ================= ASSIGN SUBJECT TO TEACHER ================= */

exports.createSubjectForTeacher = async (req, res) => {
  try {
    const { name, code, teacherId } = req.body;

    if (!name || !code || !teacherId) {
      return res.status(400).json({ message: "All fields required" });
    }

    const subject = await Subject.create({
      name,
      code,
      facultyId: new mongoose.Types.ObjectId(teacherId) // ✅ CORRECT
    });

    res.status(201).json({
      message: "Subject assigned",
      subject
    });
  } catch (err) {
    console.error("CREATE SUBJECT ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= GET SUBJECTS BY TEACHER ================= */

exports.getSubjectsByTeacher = async (req, res) => {
  try {
    const teacherId = new mongoose.Types.ObjectId(req.params.id); // ✅ FIXED

    const subjects = await Subject.find({
      facultyId: teacherId
    });

    res.json(subjects);
  } catch (err) {
    console.error("GET SUBJECTS ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= DELETE SUBJECT ================= */

exports.deleteSubject = async (req, res) => {
  try {
    await Subject.findByIdAndDelete(req.params.id);
    res.json({ message: "Subject deleted" });
  } catch (err) {
    console.error("DELETE SUBJECT ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};
