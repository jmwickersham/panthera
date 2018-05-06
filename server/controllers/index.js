// Require Packages
const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require('jsonwebtoken');

// Require JS Model Exports
const User = require("../models/user");

// Require additional JS Exports
let config = require('../config/database');
require('../config/passport')(passport);

// Root Route
router.get("/", function (req, res, next) {
  return res.send("sucessfully hit index page");
});

// Auth Routes

// Registration logic
router.post("/api/register", function (req, res) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({
      success: false,
      msg: 'Please provide username and password.'
    });
  }

  var newUser = new User({
    username: req.body.username,
    password: req.body.password,
    first_name: req.body.first_name,
    last_name: req.body.last_name
  });

  User.create(newUser, function (err, user) {
    if (err) {
      console.log(err);
      return res.status(400).json({
        success: false,
        msg: 'Error when registering user.'
      })
    } 
    else {
      return res.status(201).json({
        success: true,
        msg: 'Successful created new user.'
      });
    }
  });
});

// Login logic
router.post("/api/login", function (req, res) {
  User.findOne({
    username: req.body.username
  }, function (err, user) {
    if (err) {
      throw err;
    }
    if (!user) {
      res.status(401).json({
        success: false,
        msg: 'Authentication failed. User not found.'
      });
    } 
    else {
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          let token = jwt.sign(user.toJSON(), config.secret);
          res.status(200).json({
            success: true,
            token: 'JWT ' + token
          });
        } 
        else {
          res.status(401).json({
            success: false,
            msg: 'Authentication failed. Wrong password.'
          });
        }
      });
    }
  });
});

getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } 
    else {
      return null;
    }
  } 
  else {
    return null;
  }
};

module.exports = router;
