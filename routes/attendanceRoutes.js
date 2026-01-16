const express = require("express");
const router = express.Router();
const { getSubjectAttendance } = require("../controllers/attendanceController");
const auth = require("../middleware/authMiddleware");
const {
  markAttendance,
  getAttendanceSummary
} = require("../controllers/attendanceController");

// ✅ Mark attendance (student)
router.post("/mark", auth("student"), markAttendance);

// ✅ Attendance summary (student)
router.get("/summary", auth("student"), getAttendanceSummary);
router.get(
  "/subject/:subject",
  auth("teacher"),
  getSubjectAttendance
);

module.exports = router;
