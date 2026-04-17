const express = require("express");
const router = express.Router();
const Student = require("../models/student");

// ======================
// REGISTER
// ======================
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const normalizedEmail = email.toLowerCase();

    const existing = await Student.findOne({ email: normalizedEmail });

    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new Student({
      name,
      email: normalizedEmail,
      password
    });

    await user.save();

    res.status(201).json({
      success: true,
      message: "Registered successfully"
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


// ======================
// LOGIN
// ======================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Student.findOne({
      email: email.toLowerCase()
    });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const match = await user.comparePassword(password);

    if (!match) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        enrolledCourses: user.enrolledCourses
      }
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;