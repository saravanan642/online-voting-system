// Voting.js
export default function Voting() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-100">
      <div className="bg-white p-8 rounded-xl shadow-xl w-[350px]">
        <h2 className="text-xl font-bold text-purple-700 mb-4 text-center">
          Cast Your Vote
        </h2>

        {["Candidate A", "Candidate B", "Candidate C"].map((c) => (
          <label key={c} className="block mb-2">
            <input type="radio" name="vote" className="mr-2" />
            {c}
          </label>
        ))}

        <button className="w-full bg-purple-600 text-white py-2 rounded mt-4 hover:bg-purple-700">
          Submit Vote
        </button>
      </div>
    </div>
  );
}
