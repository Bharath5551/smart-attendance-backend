const express = require("express");
const router = express.Router();

// IMPORTANT: default import, NOT destructuring
const auth = require("../middleware/authMiddleware");

// IMPORTANT: destructure EXACT exported names
const subjectController = require("../controllers/subjectController");

// DEBUG (TEMPORARY)
console.log("createSubject =", subjectController.createSubject);

// ROUTES
router.post(
  "/create",
  auth("teacher"),
  subjectController.createSubject
);

router.get(
  "/mine",
  auth("teacher"),
  subjectController.getMySubjects
);

module.exports = router;
