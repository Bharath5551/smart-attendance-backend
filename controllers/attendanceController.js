const Attendance = require("../models/Attendance");
const Session = require("../models/Session");
const User = require("../models/User");

/* ================= MARK ATTENDANCE ================= */

exports.getAttendanceSummary = async (req, res) => {
  try {
    const studentId = req.user.id;

    // 1️⃣ Get all attendance records for student
    const attendance = await Attendance.find({ studentId });

    // 2️⃣ Build attended map
    const attendedMap = {};
    attendance.forEach(a => {
      const subject = a.subject.toUpperCase();
      attendedMap[subject] = (attendedMap[subject] || 0) + 1;
    });

    // 3️⃣ Get all sessions (classes conducted)
    const sessions = await Session.find();

    // 4️⃣ Build total sessions map
    const totalMap = {};
    sessions.forEach(s => {
      const subject = s.subject.toUpperCase();
      totalMap[subject] = (totalMap[subject] || 0) + 1;
    });

    // 5️⃣ Build final summary
    const summary = Object.keys(totalMap).map(subject => {
      const attended = attendedMap[subject] || 0;
      const total = totalMap[subject];
      const percentage =
        total === 0 ? 0 : ((attended / total) * 100).toFixed(1);

      return {
        subject,
        attended,
        total,
        percentage
      };
    });

    res.json(summary);

  } catch (err) {
    console.error("ATTENDANCE SUMMARY ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};
/* ================= STUDENT SUMMARY ================= */

exports.getAttendanceSummary = async (req, res) => {
  try {
    const studentId = req.user.id;

    const attendance = await Attendance.find({ studentId });

    if (!attendance.length) {
      return res.json([]);
    }

    const summary = {};

    attendance.forEach(a => {
      const subject = a.subject.toUpperCase();

      if (!summary[subject]) {
        summary[subject] = { attended: 0, total: 0 };
      }
      summary[subject].attended += 1;
      summary[subject].total += 1;
    });

    const result = Object.keys(summary).map(subject => {
      const { attended, total } = summary[subject];
      return {
        subject,
        attended,
        total,
        percentage: ((attended / total) * 100).toFixed(1)
      };
    });

    res.json(result);

  } catch (err) {
    console.error("SUMMARY ERROR:", err);
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

/* ================= LIVE SESSION ATTENDANCE ================= */

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
