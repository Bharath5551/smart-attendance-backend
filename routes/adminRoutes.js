const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const {
  createSubjectForTeacher,
  getSubjectsByTeacher,
  deleteSubject
} = require("../controllers/adminController");

// admin assigns subject
router.post("/subject", auth("admin"), createSubjectForTeacher);
router.get("/teachers", auth("admin"), getAllTeachers);
// admin views teacher subjects
router.get("/teacher/:id/subjects", auth("admin"), getSubjectsByTeacher);

// admin deletes subject
router.delete("/subject/:id", auth("admin"), deleteSubject);

module.exports = router;
