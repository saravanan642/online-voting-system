const express = require("express");
const cors = require("cors");
const { voters } = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

/* =====================================================
   1️⃣ LOGIN
===================================================== */
app.post("/login", (req, res) => {
  const { name, aadhaar, mobile, voterId } = req.body;

  if (!name || !aadhaar || !mobile || !voterId) {
    return res.json({
      status: false,
      message: "All fields required ❌"
    });
  }

  // Already voted check
  if (voters[aadhaar]?.voted) {
    return res.json({
      status: false,
      message: "Already voted ❌"
    });
  }

  // Save login data
  voters[aadhaar] = {
    name,
    aadhaar,
    mobile,              // ✅ SMS goes to this number (demo)
    voterId,
    voterIdVerified: false,
    aadhaarFaceToken: null,
    faceVerified: false,
    voted: false,
    vote: null
  };

  res.json({ status: true });
});

/* =====================================================
   2️⃣ VOTER ID VERIFY
===================================================== */
app.post("/voterid-verify", (req, res) => {
  const { aadhaar, enteredVoterId } = req.body;

  if (!voters[aadhaar]) {
    return res.json({
      status: false,
      message: "Invalid Aadhaar ❌"
    });
  }

  if (voters[aadhaar].voterId !== enteredVoterId) {
    return res.json({
      status: false,
      message: "Voter ID mismatch ❌"
    });
  }

  voters[aadhaar].voterIdVerified = true;

  res.json({ status: true });
});

/* =====================================================
   3️⃣ AADHAAR UPLOAD
   (Demo: save Aadhaar face token)
===================================================== */
app.post("/aadhaar-upload", (req, res) => {
  const { aadhaar } = req.body;

  if (!voters[aadhaar]?.voterIdVerified) {
    return res.json({
      status: false,
      message: "Voter ID not verified ❌"
    });
  }

  // 🔐 DEMO FACE TOKEN FROM AADHAAR IMAGE
  voters[aadhaar].aadhaarFaceToken = "AADHAAR_FACE_TOKEN";

  res.json({ status: true });
});

/* =====================================================
   4️⃣ FACE VERIFY (LIVE CAMERA)
===================================================== */
app.post("/face-verify", (req, res) => {
  const { aadhaar, liveFaceToken } = req.body;

  if (!voters[aadhaar]?.aadhaarFaceToken) {
    return res.json({
      status: false,
      message: "Aadhaar not uploaded ❌"
    });
  }

  // 🔥 STRICT MATCH
  if (voters[aadhaar].aadhaarFaceToken !== liveFaceToken) {
    return res.json({
      status: false,
      message: "Face not matched ❌"
    });
  }

  voters[aadhaar].faceVerified = true;

  res.json({ status: true });
});

/* =====================================================
   5️⃣ VOTE
===================================================== */
app.post("/vote", (req, res) => {
  const { aadhaar, candidate } = req.body;

  if (!voters[aadhaar]?.faceVerified) {
    return res.json({
      status: false,
      message: "Face not verified ❌"
    });
  }

  if (voters[aadhaar].voted) {
    return res.json({
      status: false,
      message: "Already voted ❌"
    });
  }

  voters[aadhaar].voted = true;
  voters[aadhaar].vote = candidate;

  // 📩 DEMO SMS
  res.json({
    status: true,
    message: "Voting successful ✅",
    mobile: voters[aadhaar].mobile
  });
});

/* =====================================================
   SERVER START
===================================================== */
app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
