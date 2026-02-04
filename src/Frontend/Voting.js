import axios from "axios";

export default function Voting() {
  const vote = async () => {
    const page1 = JSON.parse(localStorage.getItem("page1"));

    await axios.post("http://localhost:5000/api/vote", {
      aadhaar: page1.aadhaar,
      voterId: page1.voterId
    });

    alert("✅ Successfully Voted\n📩 Message sent to " + page1.mobile);
  };

  return (
    <>
      <h3>Candidate List</h3>
      <input type="radio" name="c"/> Candidate A <br/>
      <input type="radio" name="c"/> Candidate B <br/>
      <button onClick={vote}>Submit Vote</button>
    </>
  );
}
