const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

// ✅ IMPORT ALL REQUIRED CONTROLLERS
const {
  createTeacher,
  getAllTeachers,
  deleteTeacher,
  createSubjectForTeacher,
  getSubjectsByTeacher,
  deleteSubject
} = require("../controllers/adminController");

/* ================= ADMIN ROUTES ================= */

// teachers
router.post("/teacher", auth("admin"), createTeacher);
router.get("/teachers", auth("admin"), getAllTeachers);
router.delete("/teacher/:id", auth("admin"), deleteTeacher);

// subjects
router.post("/subject", auth("admin"), createSubjectForTeacher);
router.get("/teacher/:id/subjects", auth("admin"), getSubjectsByTeacher);
router.delete("/subject/:id", auth("admin"), deleteSubject);

module.exports = router;
