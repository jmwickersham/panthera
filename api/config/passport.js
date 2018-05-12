// Require Packages
const passport      = require("passport"),
      LocalStrategy = require("passport-local").Strategy,
      mongoose = require('mongoose');

// Require JS Model Exports
let User   = require('../models/user');

passport.use(new LocalStrategy({
  usernameField: 'username'
},
function(username, password, done) {
  User.findOne({ username: username }, function(err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false, {
        message: "User not found"
      });
    }
    if (!user.validPassword(password)) {
      return done(null, false, {
        message: "Password is wrong"
      });
    }
    return done(null, user);
  });
}));
