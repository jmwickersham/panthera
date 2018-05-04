// Require Packages
var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
    return res.send("sucessfully hit index page");
});

// This is where the non-specific routes will go (login, logout, signup, etc.)

module.exports = router;
