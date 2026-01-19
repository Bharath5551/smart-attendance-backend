const Attendance = require("../models/Attendance");
const Session = require("../models/Session");

/* ================= MARK ATTENDANCE ================= */

exports.markAttendance = async (req, res) => {
  try {
    const { sessionId } = req.body;

    // ✅ await is NOW inside async function
    const session = await Session.findById(sessionId);

    if (!session) {
      return res.status(400).json({ message: "Invalid session" });
    }

    // 🔴 DO NOT enforce location yet (next step)
    // Just reading session.locationRequired for now

    // Existing attendance logic continues below...
    // (DO NOT CHANGE YOUR CURRENT WORKING CODE)

    res.json({ message: "Attendance marked (location check pending)" });

  } catch (err) {
    console.error("MARK ATTENDANCE ERROR:", err);
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
const User = require("../models/User");

exports.getSubjectAttendance = async (req, res) => {
  try {
    const subject = req.params.subject;

    // total sessions for this subject
    const totalSessions = await Session.countDocuments({ subject });

    // all students
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
