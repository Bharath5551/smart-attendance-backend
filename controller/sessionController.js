const Session = require("../models/Session");

exports.startSession = async (req, res) => {
  try {
    const { subject } = req.body;

    if (!subject) {
      return res.status(400).json({ message: "Subject required" });
    }

    const session = await Session.create({
      teacherId: req.user.id,
      subject
    });

    res.json({
      message: "Session started",
      sessionId: session._id,
      subject: session.subject
    });

  } catch (err) {
    console.error("SESSION ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getSessionCount = async (req, res) => {
  try {
    const subject = req.params.subject;

    const count = await Session.countDocuments({ subject });

    res.json({
      subject,
      count: count + 1
    });

  } catch (err) {
    console.error("COUNT ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};
