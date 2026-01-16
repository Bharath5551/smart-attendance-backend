 const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  name: String,
  code: String,
  facultyId: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model("Subject", subjectSchema);
