const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  createTeacher,
  getAllTeachers,
  deleteTeacher,
  createSubjectForTeacher
} = require("../controllers/adminController");

router.post("/teacher", auth("admin"), createTeacher);
router.get("/teachers", auth("admin"), getAllTeachers);
router.delete("/teacher/:id", auth("admin"), deleteTeacher);
router.post(
  "/subject",
  auth("admin"),
  createSubjectForTeacher
);
module.exports = router;
