const User = require("../models/User");
const bcrypt = require("bcryptjs");
const Subject = require("../models/Subject");

exports.getSubjectsByTeacher = async (req, res) => {
  const { teacherId } = req.params;
  const subjects = await Subject.find({ facultyId: teacherId });
  res.json(subjects);
};

exports.deleteSubject = async (req, res) => {
  await Subject.findByIdAndDelete(req.params.id);
  res.json({ message: "Subject deleted" });
};
const mongoose = require("mongoose");

exports.createSubjectForTeacher = async (req, res) => {
  const { name, code, teacherId } = req.body;

  const subject = await Subject.create({
    name,
    code,
    facultyId: new mongoose.Types.ObjectId(teacherId) // 🔴 FIX
  });

  res.json({ message: "Subject assigned", subject });
};

exports.createTeacher = async (req, res) => {
  const { name, email, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  const teacher = await User.create({
    name,
    email,
    password: hashed,
    role: "teacher"
  });

  res.json({ message: "Teacher created", teacher });
};

exports.getAllTeachers = async (req, res) => {
  const teachers = await User.find({ role: "teacher" }).select("-password");
  res.json(teachers);
};

exports.deleteTeacher = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "Teacher deleted" });
};
