const express = require("express");
const router = express.Router();
const Student = require("../models/student");

// ======================
// TEST ROUTE
// ======================
router.get("/", (req, res) => {
  res.send("Students API working");
});

// ======================
// CREATE STUDENT
// ======================
router.post("/add", async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.json({ message: "Student Added", student });
  } catch (error) {
    res.status(500).json({ message: "Error adding student", error });
  }
});

// ======================
// GET ALL STUDENTS
// ======================
router.get("/all", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students" });
  }
});

// ======================
// UPDATE STUDENT
// ======================
router.put("/update/:id", async (req, res) => {
  try {
    await Student.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "Student Updated" });
  } catch (error) {
    res.status(500).json({ message: "Error updating student" });
  }
});

// ======================
// DELETE STUDENT
// ======================
router.delete("/delete/:id", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Student Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting student" });
  }
});

module.exports = router;