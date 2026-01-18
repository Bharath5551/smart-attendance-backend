const express = require("express");
const router = express.Router();

// middleware
const auth = require("../middleware/authMiddleware");

// controller
const {
  getMySubjects,
  createSubject
} = require("../controllers/subjectController");

/* ================= TEACHER ROUTES ================= */

// teacher: get own subjects
router.get("/mine", auth("teacher"), getMySubjects);

// teacher: create subject (if you still use this)
router.post("/create", auth("teacher"), createSubject);

module.exports = router;
