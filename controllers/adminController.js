const mongoose = require("mongoose");
const Subject = require("../models/Subject");

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
    console.error("ADMIN CREATE SUBJECT ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getSubjectsByTeacher = async (req, res) => {
  try {
    const teacherId = new mongoose.Types.ObjectId(req.params.id);

    const subjects = await Subject.find({
      facultyId: teacherId
    });

    res.json(subjects);
  } catch (err) {
    console.error("ADMIN GET SUBJECTS ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteSubject = async (req, res) => {
  await Subject.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
