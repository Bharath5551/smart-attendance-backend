const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  startTime: Date,
  expiresAt: Date,

  // location feature
  locationRequired: {
    type: Boolean,
    default: false
  },
  teacherLocation: {
    lat: Number,
    lng: Number
  }
});

module.exports = mongoose.model("Session", sessionSchema);
