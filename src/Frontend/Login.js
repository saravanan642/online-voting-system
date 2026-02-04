import { useState } from "react";

export default function Login({ onNext }) {
  const [name, setName] = useState("");
  const [aadhaar, setAadhaar] = useState("");
  const [mobile, setMobile] = useState("");
  const [voterId, setVoterId] = useState("");

  const handleNext = () => {
    if (!name || !aadhaar || !mobile || !voterId) {
      alert("All fields required");
      return;
    }

    // 🔥 SAVE DATA SAFELY
    localStorage.setItem(
      "user",
      JSON.stringify({
        name,
        aadhaar,
        mobile,
        voterId,
      })
    );

    onNext();
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>Login</h2>

      <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <br /><br />

      <input placeholder="Aadhaar" onChange={(e) => setAadhaar(e.target.value)} />
      <br /><br />

      <input placeholder="Mobile" onChange={(e) => setMobile(e.target.value)} />
      <br /><br />

      <input placeholder="Voter ID" onChange={(e) => setVoterId(e.target.value)} />
      <br /><br />

      <button onClick={handleNext}>Next</button>
    </div>
  );
}
