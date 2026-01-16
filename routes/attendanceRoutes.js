const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const {
  markAttendance,
  getAttendanceSummary
} = require("../controllers/attendanceController");

// ✅ Mark attendance (student)
router.post("/mark", auth("student"), markAttendance);

// ✅ Attendance summary (student)
router.get("/summary", auth("student"), getAttendanceSummary);

module.exports = router;
