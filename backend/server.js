const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const studentRoutes = require("./routes/studentRoutes");
const authRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/contactRoutes");

const app = express();

// ======================
// MIDDLEWARE
// ======================
app.use(cors());
app.use(express.json());

// ======================
// RATE LIMIT
// ======================
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max requests per IP
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
// DATABASE CONNECTION
// ======================
mongoose.connect("mongodb://127.0.0.1:27017/studentDB")
.then(() => {

  console.log("MongoDB Connected");

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

})
.catch((err) => {
  console.error("DB Error:", err);
});

// ======================
// TEST ROUTE
// ======================
app.get("/", (req, res) => {
  res.send("Backend server is running");
});