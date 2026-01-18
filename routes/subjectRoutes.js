const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const { getMySubjects } = require("../controllers/subjectController");

// teacher gets own subjects
router.get("/mine", auth("teacher"), getMySubjects);

module.exports = router;
