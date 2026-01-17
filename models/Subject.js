 const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  name: String,
  code: String,
  facultyId: {
    type: mongoose.Schema.Types.ObjectId,   // 🔴 IMPORTANT
    ref: "User",
    required: true
  }
});

module.exports = mongoose.model("Subject", subjectSchema);
