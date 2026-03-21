require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
const authRoutes = require("./routes/auth");

const app = express();

// Middleware FIRST
app.use(cors());
app.use(express.json());

// Test basic route
app.get("/hello", (req, res) => {
  res.send("Main server hello ✅");
});

// Mount routes
app.use("/api/auth", authRoutes);

// Connect DB AFTER routes are mounted
connectDB();

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});
