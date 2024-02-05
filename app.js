const express = require("express");
const apiRouter = require("./routes/api-router");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
//Modular Routing

app.use("/api", apiRouter);

//error handling
app.use((err, req, res, next) => {
  if (err.msg === "Not Found") {
    res.status(404).send({ msg: "Invalid ID present" });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Invalid Datatype for ID" });
  } else {
    next(err);
  }
});
app.use((err, req, res, next) => {
  if (err.code === "42703") {
    res.status(400).send({ msg: "Bad Request" });
  } else {
    next(err);
  }
});
app.use((err, req, res, next) => {
  if (err.code === "23502") {
    res.status(400).send({ msg: "Missing column" });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.log({ msg: err });
  res.status(500).send({ msg: err.msg });
});
module.exports = app;
