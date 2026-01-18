const mongoose = require("mongoose");
const Subject = require("../models/Subject");

/* ================= ASSIGN SUBJECT TO TEACHER ================= */

exports.createSubjectForTeacher = async (req, res) => {
  try {
    const { name, code, teacherId } = req.body;

    if (!name || !code || !teacherId) {
      return res.status(400).json({ message: "All fields required" });
    }

    if (!mongoose.isValidObjectId(teacherId)) {
      return res.status(400).json({ message: "Invalid teacher ID" });
    }

    const subject = await Subject.create({
      name,
      code,
      facultyId: new mongoose.Types.ObjectId(teacherId)
    });

    res.status(201).json({
      message: "Subject assigned",
      subject
    });
  } catch (err) {
    console.error("ADMIN CREATE SUBJECT ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= GET SUBJECTS OF A TEACHER ================= */

exports.getSubjectsByTeacher = async (req, res) => {
  try {
    const { id } = req.params;

    // 🔴 CRITICAL FIX
    if (!mongoose.isValidObjectId(id)) {
      console.error("INVALID TEACHER ID:", id);
      return res.status(400).json({ message: "Invalid teacher ID" });
    }

    const teacherId = new mongoose.Types.ObjectId(id);

    const subjects = await Subject.find({
      facultyId: teacherId
    });

    res.json(subjects);
  } catch (err) {
    console.error("ADMIN GET SUBJECTS ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= DELETE SUBJECT ================= */

exports.deleteSubject = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid subject ID" });
    }

    await Subject.findByIdAndDelete(req.params.id);
    res.json({ message: "Subject deleted" });
  } catch (err) {
    console.error("DELETE SUBJECT ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};
