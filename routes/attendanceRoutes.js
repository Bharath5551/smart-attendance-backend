const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const attendanceController = require("../controllers/attendanceController");

// STUDENT MARK ATTENDANCE
router.post(
  "/mark",
  auth("student"),
  attendanceController.markAttendance
);

// TEACHER LIVE SESSION ATTENDANCE
router.get(
  "/session/:sessionId",
  auth("teacher"),
  attendanceController.getSessionAttendance
);

// TEACHER SUBJECT ATTENDANCE
router.get(
  "/subject/:subject",
  auth("teacher"),
  attendanceController.getSubjectAttendance
);

module.exports = router;
