const express = require("express");
const mongoose = require("mongoose");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
require("dotenv").config();

const app = express();

console.log("SERVER STARTED");

// ✅ Required for Railway
app.set("trust proxy", 1);

// ======================
// CORS (SIMPLIFIED + SAFE)
// ======================
app.use(cors());

// ======================
// MIDDLEWARE
// ======================
app.use(express.json());

// ======================
// RATE LIMIT
// ======================
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use("/api", limiter);

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