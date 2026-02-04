const express = require("express");
const router = express.Router();
const {
  isAlreadyVoted,
  addVotedUser
} = require("../db");

// ✅ CONDITION 6 – already voted (FIXED)
router.post("/check-voted", (req, res) => {
  const { aadhaar, voterId } = req.body;

  if (!aadhaar || !voterId) {
    return res.status(400).json({ error: "Missing data" });
  }

  if (isAlreadyVoted(aadhaar, voterId)) {
    return res.json({ status: "ALREADY_VOTED" });
  }

  res.json({ status: "OK" });
});

// ✅ Vote submit (mark as voted)
router.post("/vote", (req, res) => {
  const { aadhaar, voterId } = req.body;

  if (isAlreadyVoted(aadhaar, voterId)) {
    return res.json({ success: false, message: "Already Voted" });
  }

  addVotedUser(aadhaar, voterId);
  res.json({ success: true });
});

module.exports = router;
