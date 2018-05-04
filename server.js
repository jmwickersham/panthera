// Require Packages
const express    = require("express"),
      bodyParser = require("body-parser"),
      mongoose   = require("mongoose");

// Require JS Model Exports
let Task = require("./server/models/task");

let seedDB = require("./seeds");

// Require JS Controller Exports
let taskRoutes  = require("./server/controllers/tasks"),
    indexRoutes = require("./server/controllers/index");

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

// Route config
app.use("/", indexRoutes);
app.use("/api/tasks", taskRoutes);

mongoose.connect(url);

// seedDB(); // Seed the database

app.listen(port, hostname, function () {
  console.log("Panthera server has started");
});
