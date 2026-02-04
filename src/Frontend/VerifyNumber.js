import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function VerifyNumber() {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const verify = async () => {
    const page1 = JSON.parse(localStorage.getItem("page1"));

    const res = await axios.post(
      "http://localhost:5000/api/verify-numbers",
      { page1, page2: data }
    );

    if (res.data.match) {
      navigate("/upload");
    } else {
      alert("❌ Invalid details");
    }
  };

  return (
    <>
      <input placeholder="Voter ID" onChange={e=>setData({...data,voterId:e.target.value})}/>
      <input placeholder="Aadhaar" onChange={e=>setData({...data,aadhaar:e.target.value})}/>
      <button onClick={verify}>Verify</button>
    </>
  );
}
