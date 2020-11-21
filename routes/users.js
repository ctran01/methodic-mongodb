const express = require("express");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;
const router = express.Router();

router.get("/user", async (req, res, next) => {
  const user = await User.findOne({ name: "chris" });
  res.json({ user });
});

router.post("/signup", async (req, res) => {
  const { email, hashed_password } = req.body;

  try {
    const user = new User({ email, password });
    await user.save();
    const token = jwt.sign({ userId: user._id }, SECRET_KEY);
    res.send({ token, userid: user._id });
  } catch (err) {
    res.status(422).send(err.message);
  }
});

router.post("/login", async (req, res) => {
  const { email, hashed_password } = req.body;
  if (!email || !password) {
    return res.status(422).send({ error: "Must provide email and password" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).send({ error: "Invalid password or email" });
  }
  try {
    await user.comparePassword(hashed_password);
    const token = jwt.sign({ userId: user._id }, SECRET_KEY);
    res.send({ token, userid: user._id });
  } catch (err) {
    return res.status(401).send({ error: "Invalid password or email" });
  }
});
module.exports = router;
