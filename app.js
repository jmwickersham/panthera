// Require Packages
const express       = require("express"),
      bodyParser    = require("body-parser"),
      passport      = require("passport"),
      favicon       = require("serve-favicon"),
      logger        = require('morgan'),
      cookieParser  = require('cookie-parser'),
      cors          = require('cors');

// Bring in mongoose data model
require('./api/models/database');

// Bring in passport config
require('./api/config/passport');

// Require JS Controller Exports
let taskRoutes  = require("./api/routes/tasks"),
    userRoutes  = require("./api/routes/users"),
    indexRoutes = require("./api/routes/index");

// Set up App
let app = express();
app.use(favicon(__dirname + '/client/src/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: false} ));
app.use(cookieParser());
app.use(cors());
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "CONNECT, DELETE, GET, HEAD, OPTIONS, PATCH, POST, PUT, TRACE");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// Passport Config
app.use(passport.initialize());

// app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// app.use(function(req, res, next) {
//  res.locals.currentUser = req.user;
//  next();
// });

// Route config
app.use("/", indexRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
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

let server = app.listen(process.env.PORT || 3000, function () {
  let port = server.address().port;
  console.log("Panthera server has started on port", port);
});
