const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

// ✅ IMPORT ALL CONTROLLERS PROPERLY
const attendanceController = require("../controllers/attendanceController");

// MARK ATTENDANCE (STUDENT)
router.post(
  "/mark",
  auth("student"),
  attendanceController.markAttendance
);

// ATTENDANCE SUMMARY (STUDENT)
router.get(
  "/summary",
  auth("student"),
  attendanceController.getAttendanceSummary
);

// SUBJECT ATTENDANCE (TEACHER)
router.get(
  "/subject/:subject",
  auth("teacher"),
  attendanceController.getSubjectAttendance
);

// 🔴 LIVE SESSION ATTENDANCE (TEACHER)
router.get(
  "/session/:sessionId",
  auth("teacher"),
  attendanceController.getSessionAttendance
);

module.exports = router;
