const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = new mongoose.Schema({
  name: { type: String, trim: true, required: false },
  email: { type: String, trim: true, required: true },
  hashed_password: { type: String, required: true },
  image: { type: String, required: false },
});

User.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.hashed_password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.hashed_password = hash;
      next();
    });
  });
});

User.methods.comparePassword = function (candidatePassword) {
  const user = this;
  return newPromise((resolve, reject) => {
    bcrypt.compare(candidatePassword, user.hashed_password, (err, isMatch) => {
      if (err) {
        return reject(err);
      }
      if (!match) {
        return reject(false);
      }
      resolve(true);
    });
  });
};

module.exports = mongoose.model("User", User);
