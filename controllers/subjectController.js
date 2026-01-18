const mongoose = require("mongoose");
const Subject = require("../models/Subject");

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
