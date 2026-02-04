const express = require("express");
const router = express.Router();
const { votedUsers } = require("../db");

// condition 6 – already voted
router.post("/check-voted", (req, res) => {
  const { aadhaar, voterId } = req.body;
  const key = aadhaar + "_" + voterId;

  if (votedUsers.has(key)) {
    return res.json({ status: "ALREADY_VOTED" });
  }
  res.json({ status: "OK" });
});

// condition 2 – re verify numbers
router.post("/verify-numbers", (req, res) => {
  const { page1, page2 } = req.body;

  if (
    page1.aadhaar === page2.aadhaar &&
    page1.voterId === page2.voterId
  ) {
    res.json({ match: true });
  } else {
    res.json({ match: false });
  }
});

// condition 3 – OCR result compare (demo)
router.post("/verify-ocr", (req, res) => {
  const { entered, ocr } = req.body;

  if (
    entered.aadhaar === ocr.aadhaar &&
    entered.voterId === ocr.voterId
  ) {
    res.json({ match: true });
  } else {
    res.json({ match: false });
  }
});

// condition 4 – face verify (demo true)
router.post("/verify-face", (req, res) => {
  res.json({ match: true }); // demo
});

// vote submit
router.post("/vote", (req, res) => {
  const { aadhaar, voterId } = req.body;
  votedUsers.add(aadhaar + "_" + voterId);
  res.json({ success: true });
});

module.exports = router;
