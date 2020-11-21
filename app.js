require("./models/User");
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const mongoURI = process.env.MONGO_DB;
const port = process.env.PORT;
const userRouter = require("./routes/users");
const requireAuth = require("../middlewares/requireAuth");

const app = express();

app.use(bodyParser.json());
app.use(userRouter);

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

app.get("/", requireAuth, (req, res) => {
  res.send("You're connected");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
