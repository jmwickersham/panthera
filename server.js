// Require Packages
const express       = require("express"),
      bodyParser    = require("body-parser"),
      mongoose      = require("mongoose"),
      passport      = require("passport"),
      LocalStrategy = require("passport-local"),
      favicon       = require("serve-favicon");

// Require JS Model Exports
let Task = require("./server/models/task"),
    User = require("./server/models/user");

let seedDB = require("./seeds");
let config = require('./server/config/database');

// Require JS Controller Exports
let taskRoutes  = require("./server/controllers/tasks"),
    userRoutes  = require("./server/controllers/users"),
    indexRoutes = require("./server/controllers/index");

// Set up App
let app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(favicon(__dirname + '/src/favicon.ico'));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "CONNECT, DELETE, GET, HEAD, OPTIONS, PATCH, POST, PUT, TRACE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Passport Config
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
 res.locals.currentUser = req.user;
 next();
});

// Route config
app.use("/", indexRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

mongoose.connect(config.dbURL);

// seedDB(); // Seed the database

let server = app.listen(process.env.PORT || 3000, function () {
  let port = server.address().port;
  console.log("Panthera server has started on port", port);
});