// Require Packages
const express = require("express"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose");

// Require JS Model Exports
let Task = require("./server/models/task");

let seedDB = require("./seeds");

// Require JS Controller Exports
// let taskRoutes = require("./controllers/tasks");

let url = process.env.DATABASEURL || "mongodb://localhost:27017/panthera";
let port = process.env.PORT || 3000;
let hostname = process.env.IP || "localhost";
let httpStatus;

// Set up App
let app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

mongoose.connect(url);

// seedDB(); // Seed the database

// Routes
app.get("/", function (req, res, next) {
  return res.send("sucessfully hit index page");
});

// Routes
app.get("/api/tasks", function (req, res, next) {
  Task.find({}, function (err, allTasks) {
    if (err) {
      console.log(err);
    } else {
      httpStatus = err ? 400 : 200;
      return res.status(httpStatus).json(allTasks);
    }
  });
});

// Show route - Shows more info about one task
app.get("/api/tasks/:id", function (req, res, next) {
  // Find the task with provided ID
  Task.findById(req.params.id, function (err, foundTask) {
    if (err || !foundTask) {
      console.log(err);
    } else {
      httpStatus = err ? 400 : 200;
      return res.status(httpStatus).json(foundTask);
    }
  });
});

app.listen(port, hostname, function () {
  console.log("Panthera server has started");
});
