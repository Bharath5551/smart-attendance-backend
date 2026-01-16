const Attendance = require("../models/Attendance");
const Session = require("../models/Session");

exports.markAttendance = async (req, res) => {
  try {
    const studentId = req.user.id;
    const { sessionId } = req.body;

    const session = await Session.findById(sessionId);

if (!session) {
  return res.status(404).json({ message: "Session not found" });
}

await Attendance.create({
  studentId,
  sessionId,
  subject: session.subject   // ✅ now guaranteed
});if (!session.subject) {
  return res.status(400).json({ message: "Session has no subject" });
}

    res.json({ message: "Attendance marked successfully" });

  } catch (err) {
    console.error("MARK ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAttendanceSummary = async (req, res) => {
  try {
    const studentId = req.user.id;

    const attendance = await Attendance.find({ studentId });
    const sessions = await Session.find();

    const attendedMap = {};
    attendance.forEach(a => {
      attendedMap[a.subject] = (attendedMap[a.subject] || 0) + 1;
    });

    const totalMap = {};
    sessions.forEach(s => {
      totalMap[s.subject] = (totalMap[s.subject] || 0) + 1;
    });

    const summary = Object.keys(totalMap).map(subject => {
      const attended = attendedMap[subject] || 0;
      const total = totalMap[subject];
      const percentage = total === 0 ? 0 : ((attended / total) * 100).toFixed(1);

      return { subject, attended, total, percentage };
    });

    res.json(summary);

  } catch (err) {
    console.error("SUMMARY ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};
