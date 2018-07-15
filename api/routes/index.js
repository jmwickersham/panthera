// Require Packages
const express = require("express");
const router  = express.Router();
const jwt     = require('express-jwt');
const auth    = jwt({
  secret: "Super secret passphrase thing!", // Change to different env variable later
  userProperty: 'payload'
});

//let ctrlProfile = require('../controllers/profile');
let ctrlAuth    = require('../controllers/authentication');

// Profile
//router.get('/profile', auth, ctrlProfile.profileRead);

// Authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);


// Root Route
router.get("/", function (req, res, next) {
  return res.send("successfully hit panthera server root route");
});

module.exports = router;
