const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  addStudent,
  getStudents,
  deleteStudent
} = require("../controllers/teacherController");

router.post("/student", auth("teacher"), addStudent);
router.get("/students/:subjectId", auth("teacher"), getStudents);
router.delete("/student", auth("teacher"), deleteStudent);

module.exports = router;
