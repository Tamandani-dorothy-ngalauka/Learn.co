const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  }
});


// HASH PASSWORD BEFORE SAVING
studentSchema.pre("save", function(next) {

  if (!this.isModified("password")) {
    return next();
  }

  bcrypt.genSalt(10, (err, salt) => {

    if (err) return next(err);

    bcrypt.hash(this.password, salt, (err, hash) => {

      if (err) return next(err);

      this.password = hash;
      next();

    });

  });

});


// COMPARE PASSWORD
studentSchema.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("Student", studentSchema);