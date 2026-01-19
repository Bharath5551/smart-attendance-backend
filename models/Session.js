const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  expiresAt: {
    type: Date,
    required: true
  },
  locationRequired: {
  type: Boolean,
  default: false
},
teacherLocation: {
  lat: Number,
  lng: Number
}
}, { timestamps: true });

module.exports = mongoose.model("Session", sessionSchema);
