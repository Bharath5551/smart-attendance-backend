const Attendance = require("../models/Attendance");
const Session = require("../models/Session");
const User = require("../models/User");

/* ================= MARK ATTENDANCE ================= */
exports.markAttendance = async (req, res) => {
  try {
    const { sessionId } = req.body;

    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(400).json({ message: "Invalid session" });
    }

    await Attendance.create({
      sessionId,
      studentId: req.user.id,
      subject: session.subject
    });

    res.json({ message: "Attendance marked" });
  } catch (err) {
    console.error("MARK ATTENDANCE ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= SESSION LIVE ATTENDANCE ================= */
exports.getSessionAttendance = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const records = await Attendance.find({ sessionId })
      .populate("studentId", "name usn")
      .sort({ createdAt: 1 });

    const students = records.map(r => ({
      name: r.studentId.name,
      usn: r.studentId.usn
    }));

    res.json(students);
  } catch (err) {
    console.error("SESSION ATTENDANCE ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= SUBJECT ATTENDANCE ================= */
exports.getSubjectAttendance = async (req, res) => {
  try {
    const subject = req.params.subject;

    const totalSessions = await Session.countDocuments({ subject });
    const students = await User.find({ role: "student" });

    const result = [];

    for (const student of students) {
      const attended = await Attendance.countDocuments({
        studentId: student._id,
        subject
      });

      const percentage =
        totalSessions === 0
          ? 0
          : ((attended / totalSessions) * 100).toFixed(1);

      result.push({
        name: student.name,
        usn: student.usn,
        attended,
        percentage
      });
    }

    res.json({
      subject,
      totalSessions,
      students: result
    });
  } catch (err) {
    console.error("SUBJECT ATTENDANCE ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};
