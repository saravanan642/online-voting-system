const express = require("express");
const router = express.Router();
const { isAlreadyVoted, addVote } = require("../db");

// test
router.get("/test", (req, res) => {
  res.send("API WORKING");
});

// condition 6
router.post("/check-voted", (req, res) => {
  const { aadhaar, voterId } = req.body;
  if (isAlreadyVoted(aadhaar, voterId)) {
    return res.json({ status: "ALREADY_VOTED" });
  }
  res.json({ status: "OK" });
});

// condition 2
router.post("/verify-numbers", (req, res) => {
  const { page1, page2 } = req.body;
  res.json({
    match:
      page1.aadhaar === page2.aadhaar &&
      page1.voterId === page2.voterId
  });
});

// condition 3 (OCR compare)
router.post("/verify-ocr", (req, res) => {
  const { entered, ocr } = req.body;

  const a1 = entered.aadhaar.replace(/\s/g, "");
  const v1 = entered.voterId.replace(/\s/g, "").toUpperCase();

  const a2 = ocr.aadhaar.replace(/\s/g, "");
  const v2 = ocr.voterId.replace(/\s/g, "").toUpperCase();

  res.json({ match: a1 === a2 && v1 === v2 });
});

// condition 4 demo
router.post("/verify-face", (req, res) => {
  res.json({ match: true });
});

// vote
router.post("/vote", (req, res) => {
  const { aadhaar, voterId } = req.body;
  if (isAlreadyVoted(aadhaar, voterId)) {
    return res.json({ success: false });
  }
  addVote(aadhaar, voterId);
  res.json({ success: true });
});

module.exports = router;
