const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const attendanceController = require("../controllers/attendanceController");

router.post(
  "/mark",
  auth("student"),
  attendanceController.markAttendance
);

router.get(
  "/session/:sessionId",
  auth("teacher"),
  attendanceController.getSessionAttendance
);

router.get(
  "/subject/:subject",
  auth("teacher"),
  attendanceController.getSubjectAttendance
);

module.exports = router;
