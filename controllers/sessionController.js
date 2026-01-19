const Session = require("../models/Session");

exports.startSession = async (req, res) => {
  try {
    const {
      subject,
      locationRequired = false,
      lat,
      lng
    } = req.body;

    const session = await Session.create({
      subject,
      facultyId: req.user.id,
      startTime: new Date(),
      expiresAt: new Date(Date.now() + 10 * 60 * 1000), // existing logic
      locationRequired,
      teacherLocation: locationRequired
        ? { lat, lng }
        : undefined
    });

    res.json({
      sessionId: session._id,
      expiresAt: session.expiresAt,
      locationRequired
    });
  } catch (err) {
    console.error("START SESSION ERROR:", err);
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
