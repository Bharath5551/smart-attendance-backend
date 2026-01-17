const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  createTeacher,
  getAllTeachers,
  deleteTeacher
} = require("../controllers/adminController");

router.post("/teacher", auth("admin"), createTeacher);
router.get("/teachers", auth("admin"), getAllTeachers);
router.delete("/teacher/:id", auth("admin"), deleteTeacher);

module.exports = router;
