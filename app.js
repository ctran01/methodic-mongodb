const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const mongoURI = process.env.MONGO_DB;
const port = process.env.PORT;

const app = express();

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  newCreateIndex: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to mongo instance");
});
mongoose.connection.on("error", () => {
  console.error("Error connecting to mongo", err);
});

app.get("/", (req, res) => {
  res.send("You're connected");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
