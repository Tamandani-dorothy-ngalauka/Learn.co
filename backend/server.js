const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const studentRoutes = require("./routes/studentRoutes");
const authRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/contactRoutes");

const app = express();

console.log("SERVER STARTED");

// ======================
// TEST ROUTE
// ======================
app.get("/", (req, res) => {
  res.send("Backend server is running");
});

// ======================
// MIDDLEWARE
// ======================
app.use(cors({ origin: "*" }));
app.use(express.json());

// ======================
// RATE LIMIT
// ======================
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests, please try again later."
});

app.use("/api", limiter);

// ======================
// ROUTES (FIXED HERE)
// ======================
app.use("/api/students", studentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);

// ======================
// DATABASE CONNECTION
// ======================
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("DB Error:", err));

// ======================
// SERVER START
// ======================
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});