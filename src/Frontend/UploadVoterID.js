import Tesseract from "tesseract.js";
import { useNavigate } from "react-router-dom";

export default function UploadVoterID() {
  const navigate = useNavigate();

  const scan = async (file) => {
    const res = await Tesseract.recognize(file,"eng");
    const clean = res.data.text.replace(/\s/g,"")
      .replace(/[^A-Z0-9]/gi,"").toUpperCase();

    if (clean.includes(localStorage.getItem("voterId"))) {
      localStorage.setItem("voterVerified","true");
      navigate("/face");
    } else {
      alert("❌ Voter ID mismatch");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow w-full max-w-md">
        <h2 className="text-xl font-bold text-center mb-4">Upload Voter ID</h2>
        <input type="file" accept="image/*"
          onChange={e=>scan(e.target.files[0])}/>
      </div>
    </div>
  );
}
