import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const submit = async () => {
    const res = await axios.post(
      "http://localhost:5000/api/check-voted",
      {
        aadhaar: form.aadhaar,
        voterId: form.voterId
      }
    );

    if (res.data.status === "ALREADY_VOTED") {
      alert("❌ Already Voted");
    } else {
      localStorage.setItem("page1", JSON.stringify(form));
      navigate("/verify");
    }
  };

  return (
    <>
      <input placeholder="Name" onChange={e=>setForm({...form,name:e.target.value})}/>
      <input placeholder="Voter ID" onChange={e=>setForm({...form,voterId:e.target.value})}/>
      <input placeholder="Aadhaar" onChange={e=>setForm({...form,aadhaar:e.target.value})}/>
      <input placeholder="Mobile" onChange={e=>setForm({...form,mobile:e.target.value})}/>
      <input placeholder="Address" onChange={e=>setForm({...form,address:e.target.value})}/>
      <button onClick={submit}>Submit</button>
    </>
  );
}
