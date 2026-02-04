import React, { useEffect, useRef } from "react";

export default function FaceScan({ user, onNext }) {
  const videoRef = useRef(null);

  // 🔥 CAMERA OPEN
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch(() => {
        alert("Camera access denied ❌");
      });
  }, []);

  const verifyFace = async () => {
    // 🔐 DEMO TOKEN
    // Aadhaar upload time-la backend save pannathu = "AADHAAR_FACE_TOKEN"
    // Same face na -> same token
    // Vera face na -> change this string
    const liveFaceToken = "AADHAAR_FACE_TOKEN";
    // test fail-ku: "OTHER_FACE_TOKEN"

    const res = await fetch("http://localhost:5000/face-verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        aadhaar: user.aadhaar,
        liveFaceToken
      })
    });

    const data = await res.json();

    if (!data.status) {
      alert("Face not matched ❌");
      return;
    }

    alert("Face verified ✅");
    onNext();
  };

  return (
    <div style={{ textAlign: "center", marginTop: 40 }}>
      <h3>Live Face Verification</h3>

      {/* CAMERA PREVIEW */}
      <video
        ref={videoRef}
        autoPlay
        width="300"
        height="220"
        style={{ border: "2px solid black" }}
      />

      <br /><br />

      <button onClick={verifyFace}>
        Verify Face
      </button>
    </div>
  );
}
