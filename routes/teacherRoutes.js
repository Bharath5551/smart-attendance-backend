const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {
  addStudent,
  deleteStudent,
  getStudents
} = require("../controllers/teacherController");

router.get("/students", auth("teacher"), getStudents);
router.post("/student", auth("teacher"), addStudent);
router.delete("/student/:id", auth("teacher"), deleteStudent);

module.exports = router;
