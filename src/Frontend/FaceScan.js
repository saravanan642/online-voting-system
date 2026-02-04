import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function FaceScan() {
  const navigate = useNavigate();

  const verify = async () => {
    const res = await axios.post(
      "http://localhost:5000/api/verify-face"
    );

    if (res.data.match) {
      navigate("/voting");
    } else {
      alert("❌ Face not matched");
    }
  };

  return <button onClick={verify}>Capture & Verify Face</button>;
}
