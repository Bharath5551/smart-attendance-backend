const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* ================= REGISTER ================= */
exports.register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      usn,
      branch,
      year,
      semester,
      subjects
    } = req.body;

    // 🔴 VALIDATION (THIS FIXES YOUR ERROR)
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        message: "name, email, password, and role are required"
      });
    }

    // Debug log (keep for now)
    console.log("REGISTER BODY:", req.body);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const isTeacher = role === "teacher";

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,

      // student fields
      usn: !isTeacher ? usn : undefined,
      branch: !isTeacher ? branch : undefined,
      year: !isTeacher ? year : undefined,
      semester: !isTeacher ? semester : undefined,

      // teacher fields
      subjects: isTeacher ? subjects : []
    });

    res.status(201).json({
      message: "User registered successfully",
      role: user.role
    });

  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= LOGIN ================= */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("LOGIN EMAIL:", email);

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    console.log("USER FOUND:", user.email, user.role);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 🔴 THIS IS THE MOST IMPORTANT LINE
    res.json({
  token,
  role: user.role,
  name: user.name,

  // teacher
  subjects: user.subjects,

  // student
  usn: user.usn,
  branch: user.branch,
  year: user.year,
  semester: user.semester
});

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};
