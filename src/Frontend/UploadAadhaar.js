import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UploadAadhaar() {
  const navigate = useNavigate();

  const page1 = JSON.parse(localStorage.getItem("page1"));

  const [aadhaarImg, setAadhaarImg] = useState(null);
  const [voterImg, setVoterImg] = useState(null);

  // 🔴 IMPORTANT: user manually enters numbers seen in image
  const [aadhaarFromImage, setAadhaarFromImage] = useState("");
  const [voterFromImage, setVoterFromImage] = useState("");

  const [result, setResult] = useState("");

  const verifyImages = async () => {
    if (!aadhaarImg || !voterImg) {
      alert("Please upload both images");
      return;
    }

    const res = await axios.post(
      "http://localhost:5000/api/verify-ocr",
      {
        entered: {
          aadhaar: page1.aadhaar,
          voterId: page1.voterId
        },
        ocr: {
          aadhaar: aadhaarFromImage,
          voterId: voterFromImage
        }
      }
    );

    if (res.data.match) {
      setResult("✅ Matched");
      setTimeout(() => navigate("/face"), 1000);
    } else {
      setResult("❌ Not Matched");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Condition 3 – Verify Aadhaar & Voter ID</h2>

      <p>Aadhaar Image:</p>
      <input type="file" onChange={(e) => setAadhaarImg(e.target.files[0])} />

      <p>Aadhaar Number (as seen in image):</p>
      <input
        type="text"
        onChange={(e) => setAadhaarFromImage(e.target.value)}
      />

      <p>Voter ID Image:</p>
      <input type="file" onChange={(e) => setVoterImg(e.target.files[0])} />

      <p>Voter ID Number (as seen in image):</p>
      <input
        type="text"
        onChange={(e) => setVoterFromImage(e.target.value)}
      />

      <br /><br />
      <button onClick={verifyImages}>Verify Images</button>

      <h3>{result}</h3>
    </div>
  );
}
