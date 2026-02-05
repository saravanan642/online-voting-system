import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Tesseract from "tesseract.js";

export default function UploadAadhaar() {
  const navigate = useNavigate();
  const page1 = JSON.parse(localStorage.getItem("page1"));
  const [aadhaarImg, setAadhaarImg] = useState(null);
  const [voterImg, setVoterImg] = useState(null);
  const [result, setResult] = useState("");

  const readText = async (img) => {
    const res = await Tesseract.recognize(img, "eng");
    return res.data.text;
  };

  const verifyImages = async () => {
    const aText = await readText(aadhaarImg);
    const vText = await readText(voterImg);

    const a = aText.match(/\d{4}\s?\d{4}\s?\d{4}/)?.[0]?.replace(/\s/g,"");
    const v = vText.replace(/[^A-Z0-9]/gi,"").toUpperCase();

    if (
      a === page1.aadhaar.replace(/\s/g,"") &&
      v.includes(page1.voterId.toUpperCase())
    ) {
      setResult("✅ Matched");
      setTimeout(()=>navigate("/face"),1000);
    } else {
      setResult("❌ Not Matched");
    }
  };

  return (
    <>
      <input type="file" onChange={e=>setAadhaarImg(e.target.files[0])}/>
      <input type="file" onChange={e=>setVoterImg(e.target.files[0])}/>
      <button onClick={verifyImages}>Verify Images</button>
      <h3>{result}</h3>
    </>
  );
}
