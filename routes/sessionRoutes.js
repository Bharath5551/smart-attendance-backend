 const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

// ✅ IMPORT BOTH CONTROLLERS CORRECTLY
const {
  startSession,
  getSessionCount
} = require("../controllers/sessionController");

// ✅ Start attendance session
router.post("/start", auth("teacher"), startSession);

// ✅ Get next session count per subject
router.get("/count/:subject", auth("teacher"), getSessionCount);

module.exports = router;
