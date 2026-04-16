const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

console.log("SERVER STARTED");

app.set("trust proxy", 1);

// ✅ FORCE CORS ON EVERY RESPONSE (THIS IS THE FIX)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://tamandani-dorothy-ngalauka.github.io");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200); // handle preflight immediately
  }

  next();
});

// ✅ BODY PARSER
app.use(express.json());

// ❌ REMOVE rate limiter completely for now

// ======================
// ROUTES
// ======================
const studentRoutes = require("./routes/studentRoutes");
const authRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/contactRoutes");

app.use("/api/students", studentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);

// ======================
// TEST ROUTE
// ======================
app.get("/", (req, res) => {
  res.send("Backend server is running");
});

// ======================
// DATABASE
// ======================
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("DB Error:", err));

// ======================
// SERVER START
// ======================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
