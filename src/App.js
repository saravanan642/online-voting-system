import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Frontend/Login";
import VerifyNumber from "./Frontend/VerifyNumber";
import UploadAadhaar from "./Frontend/UploadAadhaar";
import FaceScan from "./Frontend/FaceScan";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/verify" element={<VerifyNumber />} />
        <Route path="/upload" element={<UploadAadhaar />} />
        <Route path="/face" element={<FaceScan />} />
      </Routes>
    </BrowserRouter>
  );
}
