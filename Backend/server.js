const express = require("express");
const cors = require("cors");
const verifyRoutes = require("./routes/verify");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", verifyRoutes);

app.listen(5000, () =>
  console.log("✅ Backend running on port 5000")
);
