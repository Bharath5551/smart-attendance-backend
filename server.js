require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express(); // ✅ app FIRST

// Connect DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// TEST ROUTE (now app exists)
app.post("/ping", (req, res) => {
  res.status(200).json({ message: "Ping OK" });
});

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
const auth = require("./middleware/authMiddleware");
app.use("/api/subjects", require("./routes/subjectRoutes"));
app.use("/api/sessions", require("./routes/sessionRoutes"));
app.use("/api/attendance", require("./routes/attendanceRoutes"));

app.get("/api/protected", auth, (req, res) => {
  res.json({ message: "Access granted", user: req.user });
});

// Health check
app.get("/", (req, res) => {
  res.send("API running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
