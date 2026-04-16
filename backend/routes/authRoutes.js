const express = require("express");
const router = express.Router();
const Student = require("../models/student");

// ======================
// REGISTER ROUTE
// ======================
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // ✅ Validate input (prevents crashes)
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const normalizedEmail = email.toLowerCase();

    const existingUser = await Student.findOne({
      email: normalizedEmail
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const newUser = new Student({
      name,
      email: normalizedEmail,
      password
    });

    await newUser.save();

    // ✅ Always send clean JSON
    return res.status(201).json({
      success: true,
      message: "User registered successfully"
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Server error"
    });
  }
});


// ======================
// LOGIN ROUTE
// ======================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password required"
      });
    }

    const normalizedEmail = email.toLowerCase();

    const user = await Student.findOne({
      email: normalizedEmail
    });

    if (!user) {
      return res.status(401).json({
        message: "User not found"
      });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid password"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});

module.exports = router;