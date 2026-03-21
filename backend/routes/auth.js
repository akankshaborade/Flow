const express = require("express");
const router = express.Router();

router.get("/test", (req, res) => {
  res.send("Auth route working ✅");
});

router.post("/register", (req, res) => {
  res.json({ message: "Register route working ✅" });
});

router.post("/login", (req, res) => {
  res.json({ message: "Login route working ✅" });
});

module.exports = router;
