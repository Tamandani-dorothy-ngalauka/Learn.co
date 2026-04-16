const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const Student = require("../models/student");


// ======================
// REGISTER ROUTE
// ======================
router.post("/register", async (req, res) => {

  try {

    const { name, email, password } = req.body;

    // check fields
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // check if user exists
const user = await Student.findOne({
  email: email.toLowerCase()
});

const existingUser = await Student.findOne({
  email: email.toLowerCase()
});

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const newUser = new Student({
      name,
      email,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error"
    });

  }

});


// ======================
// LOGIN ROUTE
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

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.status(200).json({
      message: "Login successful",
      user
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;