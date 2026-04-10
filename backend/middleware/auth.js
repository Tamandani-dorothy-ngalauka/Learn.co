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
    const existingUser = await Student.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    // create user
    const newUser = new Student({
      name,
      email,
      password
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

    // check fields
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    // find user
    const user = await Student.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "User not found"
      });
    }

    // compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Incorrect password"
      });
    }

    res.json({
      message: "Login successful",
      user
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error"
    });

  }

});


module.exports = router;
