const fs = require("fs");
const path = require("path");

const DB_FILE = path.join(__dirname, "voted.json");

// file illa na create pannum
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify([]));
}

function getVotedUsers() {
  return JSON.parse(fs.readFileSync(DB_FILE));
}

function addVotedUser(aadhaar, voterId) {
  const users = getVotedUsers();
  users.push({ aadhaar, voterId });
  fs.writeFileSync(DB_FILE, JSON.stringify(users));
}

function isAlreadyVoted(aadhaar, voterId) {
  const users = getVotedUsers();
  return users.some(
    (u) => u.aadhaar === aadhaar && u.voterId === voterId
  );
}

module.exports = {
  isAlreadyVoted,
  addVotedUser
};
