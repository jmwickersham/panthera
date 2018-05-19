// Require Packages
const express       = require("express"),
      bodyParser    = require("body-parser"),
      passport      = require("passport"),
      favicon       = require("serve-favicon"),
      cookieParser  = require('cookie-parser'),
      cors          = require('cors');

// Bring in mongoose data model
require('./api/models/database');

// Bring in passport config
require('./api/config/passport');

// Require JS Controller Exports
const taskRoutes  = require("./api/routes/tasks"),
      userRoutes  = require("./api/routes/users"),
      indexRoutes = require("./api/routes/index");

// Create link to Angular build directory
const distDir = __dirname + "/dist/";

// Set up App
let app = express();
app.use(favicon(__dirname + '/client/src/favicon.ico'));
app.use(express.static(distDir));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// Passport Config
app.use(passport.initialize());

// Route config
app.use("/", indexRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Catch unauthorized errors
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});

// Initialize app
let server = app.listen(process.env.PORT || 3000, process.env.IP || "localhost", function () {
  let port = server.address().port;
  console.log("Panthera server has started on port", port);
});
