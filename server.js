// Require Packages
const express       = require("express"),
      bodyParser    = require("body-parser"),
      path          = require("path"),
      passport      = require("passport"),
      favicon       = require("serve-favicon"),
      cookieParser  = require('cookie-parser'),
      cors          = require('cors'),
      Raven         = require('raven');

// Must configure Raven before doing anything else with it
Raven.config('https://b8334ab2837946a78618193b9b014917@sentry.io/1209804').install();

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
app.use(Raven.requestHandler());
app.use(Raven.errorHandler());
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

// Optional fallthrough error handler
app.use(function onError(err, req, res, next) {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500;
  res.end(res.sentry + '\n');
});

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

// For all GET requests, send back index.html so that PathLocationStrategy can be used
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

// Initialize app
let server = app.listen(process.env.PORT || 3000, process.env.IP || "localhost", function () {
  let port = server.address().port;
  console.log("Panthera server has started on port", port);
});
