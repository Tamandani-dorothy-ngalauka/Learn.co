const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

console.log("SERVER STARTED");

app.set("trust proxy", 1);

// ✅ CORS (this alone is enough)
app.use(cors({
  origin: "https://tamandani-dorothy-ngalauka.github.io",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// ❌ REMOVE app.options("*", cors());

app.use(express.json());

// ROUTES
const studentRoutes = require("./routes/studentRoutes");
const authRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/contactRoutes");

app.use("/api/students", studentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);

// TEST
app.get("/", (req, res) => {
  res.send("Backend server is running");
});

// DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("DB Error:", err));

// SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));