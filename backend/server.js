require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");

const app = express();
connectDB();

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
