// Require Packages
const express       = require("express"),
      bodyParser    = require("body-parser"),
      passport      = require("passport"),
      favicon       = require("serve-favicon"),
      logger        = require('morgan'),
      cookieParser  = require('cookie-parser'),
      cors          = require('cors'),
      http          = require('http');

// Bring in mongoose data model
require('./api/models/database');

// Bring in passport config
require('./api/config/passport');

// Require JS Controller Exports
let taskRoutes  = require("./api/routes/tasks"),
    userRoutes  = require("./api/routes/users"),
    indexRoutes = require("./api/routes/index");

// Get port from environment and store in Express.
let port = normalizePort(process.env.PORT || '3000');

// Set up App
let app = express();
app.use(favicon(__dirname + '/client/src/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: false} ));
app.use(cookieParser());
app.use(cors());
app.set('port', port);

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

// Create HTTP server.
let server = http.createServer(app);

// Listen on provided port, on all network interfaces.
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

// Normalize a port into a number, string, or false.
function normalizePort(val) {
  let port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

// Event listener for HTTP server "error" event.
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  let bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

// Event listener for HTTP server "listening" event.
function onListening() {
  let addr = server.address();
  let bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  console.log(`Panthera server listening on port ${bind}`);
}

// TO DO: Remove this code if I don't end up needing it
// app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// app.use(function(req, res, next) {
//  res.locals.currentUser = req.user;
//  next();
// });

// app.listen(port, function () {
//   console.log("Panthera server has started on port", port);
// });