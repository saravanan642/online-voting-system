import { useState } from "react";

export default function UploadVoterID() {
  const [enteredAadhaar, setEnteredAadhaar] = useState("");

  const verify = () => {
    const storedUser = localStorage.getItem("user");

    // 🛑 NULL CHECK
    if (!storedUser) {
      alert("No user data found. Please login again.");
      return;
    }

    const user = JSON.parse(storedUser);

    if (!user.aadhaar) {
      alert("Aadhaar missing in storage");
      return;
    }

    if (user.aadhaar === enteredAadhaar) {
      alert("Aadhaar verified ✅");
    } else {
      alert("Aadhaar mismatch ❌");
    }
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>Verify Aadhaar</h2>

      <input
        placeholder="Enter Aadhaar again"
        onChange={(e) => setEnteredAadhaar(e.target.value)}
      />
      <br /><br />

      <button onClick={verify}>Verify</button>
    </div>
  );
}
