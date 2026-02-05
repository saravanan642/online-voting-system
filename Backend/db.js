const fs = require("fs");
const path = require("path");

const DB_FILE = path.join(__dirname, "voted.json");

if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify([]));
}

function getAll() {
  return JSON.parse(fs.readFileSync(DB_FILE));
}

function isAlreadyVoted(aadhaar, voterId) {
  return getAll().some(
    v => v.aadhaar === aadhaar && v.voterId === voterId
  );
}

function addVote(aadhaar, voterId) {
  const data = getAll();
  data.push({ aadhaar, voterId });
  fs.writeFileSync(DB_FILE, JSON.stringify(data));
}

module.exports = { isAlreadyVoted, addVote };
