const express = require("express");
const router = express.Router();
const Student = require("../models/student");


// ======================
// GET STUDENT BY ID
// ======================
router.get("/:id", async (req, res) => {
  try {
    const user = await Student.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


// ======================
// ENROLL COURSE
// ======================
router.post("/enroll", async (req, res) => {
  try {
    const { userId, courseId } = req.body;

    const user = await Student.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.enrolledCourses.includes(courseId)) {
      return res.status(400).json({ message: "Already enrolled" });
    }

    user.enrolledCourses.push(courseId);

    await user.save();

    res.json({
      success: true,
      enrolledCourses: user.enrolledCourses
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;