const express = require("express");
const router = express.Router();
const adminMiddleware = require("../middleware/adminMiddleware");

const Contact = require("../models/contact");


// SAVE CONTACT MESSAGE
router.post("/contact", async (req, res) => {

  try {

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const newMessage = new Contact({
      name,
      email,
      message
    });

    await newMessage.save();

    res.status(201).json({
      message: "Message saved successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error"
    });

  }

});

module.exports = router;

