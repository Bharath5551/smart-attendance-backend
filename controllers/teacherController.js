const User = require("../models/User");
const Subject = require("../models/Subject");
const Enrollment = require("../models/Enrollment");

/* -------- ADD STUDENT TO SUBJECT -------- */
exports.addStudent = async (req, res) => {
  const { name, usn, email, subjectId } = req.body;

  const student = await User.create({
    name,
    usn,
    email,
    password: "default123",
    role: "student"
  });

  await Enrollment.create({
    studentId: student._id,
    subjectId
  });

  res.json({ message: "Student added", student });
};

/* -------- GET STUDENTS FOR SUBJECT -------- */
exports.getStudents = async (req, res) => {
  const { subjectId } = req.params;

  const students = await Enrollment.find({ subjectId })
    .populate("studentId", "name usn email");

  res.json(students);
};

/* -------- DELETE STUDENT -------- */
exports.deleteStudent = async (req, res) => {
  const { studentId, subjectId } = req.body;

  await Enrollment.deleteOne({ studentId, subjectId });
  await User.findByIdAndDelete(studentId);

  res.json({ message: "Student deleted" });
};
