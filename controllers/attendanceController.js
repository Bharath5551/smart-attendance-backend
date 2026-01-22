const Attendance = require("../models/Attendance");

exports.getAttendanceSummary = async (req, res) => {
  try {
    const studentId = req.user.id;

    // 1️⃣ Fetch all attendance for this student
    const attendance = await Attendance.find({ studentId });

    if (!attendance || attendance.length === 0) {
      return res.json([]);
    }

    // 2️⃣ Build subject map
    const summaryMap = {};

    attendance.forEach(a => {
      const subject = a.subject.trim().toUpperCase();

      if (!summaryMap[subject]) {
        summaryMap[subject] = {
          subject,
          attended: 0,
          total: 0
        };
      }

      summaryMap[subject].attended += 1;
    });

    // 3️⃣ Total sessions = count of unique sessions per subject
    attendance.forEach(a => {
      const subject = a.subject.trim().toUpperCase();
      summaryMap[subject].total += 1;
    });

    // 4️⃣ Build final response
    const result = Object.values(summaryMap).map(item => {
      const percentage =
        item.total === 0
          ? 0
          : ((item.attended / item.total) * 100).toFixed(1);

      return {
        subject: item.subject,
        attended: item.attended,
        total: item.total,
        percentage
      };
    });

    res.json(result);

  } catch (err) {
    console.error("ATTENDANCE SUMMARY ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};
