const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const studentRoutes = require("./routes/studentRoutes");
const authRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/contactRoutes");

const app = express();

// ======================
// TEST ROUTE (KEEP AT TOP)
// ======================
app.get("/", (req, res) => {
  res.send("Backend server is running");
});

// ======================
// MIDDLEWARE
// ======================
app.use(cors({
  origin: "*"
}));

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
// ROUTES
// ======================
app.use("/api", studentRoutes);
app.use("/api", authRoutes);
app.use("/api", contactRoutes);

// ======================
// SERVER START (START FIRST)
// ======================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// ======================
// DATABASE CONNECTION (AFTER SERVER START)
// ======================
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("DB Error:", err));