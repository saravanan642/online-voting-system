// Login.js
export default function Login({ onNext }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-indigo-200">
      <div className="bg-white p-8 rounded-xl shadow-xl w-[350px]">
        <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">
          Online Voting Login
        </h2>

        <input
          type="text"
          placeholder="Name"
          className="w-full border p-2 mb-3 rounded"
        />
        <input
          type="text"
          placeholder="Aadhaar Number"
          className="w-full border p-2 mb-3 rounded"
        />
        <input
          type="text"
          placeholder="Mobile Number"
          className="w-full border p-2 mb-3 rounded"
        />
        <input
          type="text"
          placeholder="Voter ID"
          className="w-full border p-2 mb-5 rounded"
        />

        <button
          onClick={onNext}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          Next
        </button>
      </div>
    </div>
  );
}
