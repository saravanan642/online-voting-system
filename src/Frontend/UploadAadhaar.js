import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UploadAadhaar() {
  const navigate = useNavigate();

  const verify = async () => {
    const page1 = JSON.parse(localStorage.getItem("page1"));

    const ocr = {
      aadhaar: page1.aadhaar,
      voterId: page1.voterId
    }; // demo OCR

    const res = await axios.post(
      "http://localhost:5000/api/verify-ocr",
      { entered: page1, ocr }
    );

    if (res.data.match) {
      navigate("/face");
    } else {
      alert("❌ Image not matched");
    }
  };

  return <button onClick={verify}>Verify Images</button>;
}
