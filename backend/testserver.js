const express = require("express");

const app = express();

app.use(express.json());

app.get("/hello", (req, res) => {
  res.send("Hello working ✅");
});

app.get("/api/auth/test", (req, res) => {
  res.send("Auth test working ✅");
});

app.listen(5001, () => {
  console.log("Test Server running on port 5001");
});
