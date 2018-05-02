// Require Packages
const express        = require("express"), 
      bodyParser     = require("body-parser"),
      mongoose       = require("mongoose");

// Require JS Model Exports
let Task = require("./server/models/task");

let seedDB     = require("./seeds");

// Require JS Controller Exports
// let taskRoutes = require("./controllers/tasks");

let url = process.env.DATABASEURL || "mongodb://localhost:27017/panthera";
let port = process.env.PORT || 3000;
let hostname = process.env.IP || "localhost";
let httpStatus;

// Set up App
let app = express();
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect(url);

// seedDB(); // Seed the database

// Routes
app.get("/", function(req, res) {
    return res.send("sucessfully hit index page");
});

// Routes
app.get("/tasks", function(req, res) {
    Task.find({}, function(err, allTasks) {
        if (err) {
            console.log(err);
        }
        else {
            httpStatus = err ? 400 : 201;
		    return res.status(httpStatus).json(allTasks);
        }
    });
});

app.listen(port, hostname, function() {
    console.log("Panthera server has started");
});