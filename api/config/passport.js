// Require Packages
const passport      = require("passport"),
      LocalStrategy = require("passport-local").Strategy,
      mongoose      = require('mongoose');

// Require JS Model Exports
const User = require("../models/user");

passport.use(new LocalStrategy(
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
      if (!user.verifyPassword(password)) {
        return done(null, false, {
          message: "Password is wrong"
        });
      }
      return done(null, user);
    });
  })
);
