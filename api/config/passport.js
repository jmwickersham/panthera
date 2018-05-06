// Require Packages
// const JwtStrategy = require('passport-jwt').Strategy,
//       ExtractJwt  = require('passport-jwt').ExtractJwt;
const passport      = require("passport"),
      LocalStrategy = require("passport-local").Strategy,
      mongoose = require('mongoose');

// Require JS Model Exports
let User   = require('../models/user');

// // Require additional JS Exports
// let config = require('../config/database');

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

// module.exports = function (passport) {
//   var opts = {};
//   opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
//   opts.secretOrKey = config.secret;
//   passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
//     User.findOne({id: jwt_payload.id}, function (err, user) {
//       if (err) {
//         return done(err, false);
//       }
//       if (user) {
//         done(null, user);
//       } 
//       else {
//         done(null, false);
//       }
//     });
//   }));
// };
