const Attendance = require("../models/Attendance");
const Session = require("../models/Session");
const User = require("../models/User");

/* ================= MARK ATTENDANCE ================= */

exports.markAttendance = async (req, res) => {
  try {
    const { sessionId } = req.body;
    const studentId = req.user.id;

    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(400).json({ message: "Invalid session" });
    }

    // ⛔ Block expired sessions
    if (new Date() > session.expiresAt) {
      return res.status(403).json({ message: "Session expired" });
    }

    // ⛔ Prevent duplicate attendance
    const existing = await Attendance.findOne({ sessionId, studentId });
    if (existing) {
      return res.status(409).json({ message: "Attendance already marked" });
    }

    await Attendance.create({
      studentId,
      sessionId,
      subject: session.subject
    });

    res.json({ message: "Attendance marked successfully" });

  } catch (err) {
    console.error("MARK ATTENDANCE ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= STUDENT SUMMARY ================= */

exports.getAttendanceSummary = async (req, res) => {
  try {
    const studentId = req.user.id;

    const attendance = await Attendance.find({ studentId });
    const sessions = await Session.find();

    const attendedMap = {};
    attendance.forEach(a => {
      const subject = a.subject.toUpperCase();
      attendedMap[subject] = (attendedMap[subject] || 0) + 1;
    });

    const totalMap = {};
    sessions.forEach(s => {
      const subject = s.subject.toUpperCase();
      totalMap[subject] = (totalMap[subject] || 0) + 1;
    });

    const summary = Object.keys(totalMap).map(subject => {
      const attended = attendedMap[subject] || 0;
      const total = totalMap[subject];
      const percentage =
        total === 0 ? 0 : ((attended / total) * 100).toFixed(1);

      return { subject, attended, total, percentage };
    });

    res.json(summary);

  } catch (err) {
    console.error("SUMMARY ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= TEACHER SUBJECT VIEW ================= */

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

/* ================= LIVE SESSION ================= */

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
