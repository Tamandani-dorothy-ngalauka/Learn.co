const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Student = require("../models/student");

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // validate input (IMPORTANT)
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await Student.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Student({
      name,
      email,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    console.error(error); // IMPORTANT for Railway logs
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;