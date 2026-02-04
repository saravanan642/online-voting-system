import React, { useState } from "react";
import Login from "./Frontend/Login";
import UploadVoterID from "./Frontend/UploadVoterID";
import UploadAadhaar from "./Frontend/UploadAadhaar"; // 👈 ADD
import FaceScan from "./Frontend/FaceScan";
import Voting from "./Frontend/Voting";

function App() {
  const [step, setStep] = useState(1);
  const [user, setUser] = useState(null);

  return (
    <>
      {step === 1 && <Login setUser={setUser} onNext={() => setStep(2)} />}
      {step === 2 && <UploadVoterID user={user} onNext={() => setStep(3)} />}
      {step === 3 && <UploadAadhaar user={user} onNext={() => setStep(4)} />}
      {step === 4 && <FaceScan user={user} onNext={() => setStep(5)} />}
      {step === 5 && <Voting user={user} />}
    </>
  );
}

export default App;
