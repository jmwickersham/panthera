// Require Packages
const express = require("express");
const router  = express.Router();

// Require JS Model Exports
let User = require("../models/user");

// Routes
router.get("/", function (req, res, next) {
    User.find({}, function (err, allUsers) {
        if (err) {
            console.log(err);
            httpStatus = 400;
        }
        else {
            httpStatus = 200;
        }
        return res.status(httpStatus).json(allUsers);
    });
});

// Show route - Shows more info about one user
router.get("/:id", function (req, res, next) {
    User.findById(req.params.id, function (err, foundUser) {
        if (err) {
            console.log(err);
            httpStatus = 400;
        } 
        else if (!foundUser) {
            httpStatus = 404;
        }
        else {
            httpStatus = 200;
        }
        return res.status(httpStatus).json(foundUser);
    });
});

// Update route
router.put("/:id", function(req, res) {
    User.findByIdAndUpdate(req.params.id, req.body, function(err, updatedUser) {
        if (err) {
            console.log(err);
            httpStatus = 400;
        }
        else if (!updatedUser) {
            console.log('not found?');
            httpStatus = 404;
        }
        else {
            console.log(`success: ${updatedUser}`);
            httpStatus = 201;
        }
        return res.status(httpStatus).json(updatedUser);
    });
});

// Destroy Route
router.delete("/:id", function(req, res) {
    User.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            console.log(err);
            httpStatus = 400;
        }
        else {
            httpStatus = 204;
        }
        return res.status(httpStatus).json(req.params.id);
    });
});

module.exports = router;
