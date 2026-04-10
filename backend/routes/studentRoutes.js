const express = require("express");
const router = express.Router();
const Student = require("../models/student");

// CREATE
router.post("/add", async (req, res) => {
  const data = new Student(req.body);
  await data.save();
  res.send("Student Added");
});

// READ
router.get("/students", async (req, res) => {
  const data = await Student.find();
  res.json(data);
});

// UPDATE
router.put("/update/:id", async (req, res) => {
  await Student.findByIdAndUpdate(req.params.id, req.body);
  res.send("Student Updated");
});

// DELETE
router.delete("/delete/:id", async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.send("Student Deleted");
});


// //LOGIN
// router.post("/login", async (req, res) => {

//   const { email, password } = req.body;

//   try {
//     const user = await Student.findOne({ email, password });

//     if (!user) {
//       return res.status(401).json({
//         message: "Invalid email or password"
//       });
//     }

//     res.json({
//       message: "Login successful",
//       user
//     });

//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }

// });

module.exports = router;