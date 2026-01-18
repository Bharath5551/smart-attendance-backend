const Subject = require("../models/Subject");

exports.createSubject = async (req, res) => {
  try {
    if (req.user.role !== "teacher" && req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { name, code } = req.body;

    const subject = await Subject.create({
      name,
      code,
      facultyId: req.user.id,
    });

    res.status(201).json({ message: "Subject created", subject });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
const mongoose = require("mongoose");

exports.getMySubjects = async (req, res) => {
  try {
    const teacherId = new mongoose.Types.ObjectId(req.user.id);

    const subjects = await Subject.find({
      facultyId: teacherId
    });

    res.json(subjects);
  } catch (err) {
    console.error("GET MY SUBJECTS ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};
