const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
  markAttendance,
  getAttendanceSummary,
  getSubjectAttendance,
  getSessionAttendance
} = require("../controllers/attendanceController");

router.post("/mark", auth("student"), markAttendance);
router.get("/summary", auth("student"), getAttendanceSummary);
router.get("/subject/:subject", auth("teacher"), getSubjectAttendance);
router.get("/session/:sessionId", auth("teacher"), getSessionAttendance);

module.exports = router;
