import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function VerifyNumber() {
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const page1 = JSON.parse(localStorage.getItem("page1"));

  const verify = async () => {
    const res = await axios.post(
      "http://localhost:5000/api/verify-numbers",
      { page1, page2: data }
    );

    res.data.match ? navigate("/upload") : alert("Invalid");
  };

  return (
    <>
      <input placeholder="Aadhaar" onChange={e=>setData({...data,aadhaar:e.target.value})}/>
      <input placeholder="Voter ID" onChange={e=>setData({...data,voterId:e.target.value})}/>
      <button onClick={verify}>Verify</button>
    </>
  );
}
