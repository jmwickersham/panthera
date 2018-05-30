// Require Packages
const express = require("express");
const router = express.Router();

// Require JS Model Exports
let User = require("../models/user");

// Routes
router.get("/", function (req, res, next) {
    let pageNo = parseInt(req.query.pageNo);
    let size = parseInt(req.query.size);
    let query = {};

    if (pageNo < 0 || pageNo === 0) {
        response = {
            "error": true,
            "message": "invalid page number, should start with 1"
        };
        return res.status().json(response);
    }

    query.skip = size * (pageNo - 1);
    query.limit = size;

    User.count({}, function (err, totalCount) {
        if (err) {
            response = {
                "error": true,
                "message": "Error fetching data"
            };
        }
        User.find({}, {}, query, function (err, allUsers) {
            if (err) {
                console.log(err);
                httpStatus = 400;
            } else {
                httpStatus = 200;
                let totalPages = Math.ceil(totalCount / size);
                response = {
                    "data": allUsers,
                    metadata: {
                        "currentPage": pageNo,
                        "totalPages": totalPages,
                        "size": size
                    }
                };
            }
            return res.status(httpStatus).json(response);
        });
    });
});

// Show route - Shows more info about one user
router.get("/:id", function (req, res, next) {
    User.findById(req.params.id, function (err, foundUser) {
        if (err) {
            console.log(err);
            httpStatus = 400;
        } else if (!foundUser) {
            httpStatus = 404;
        } else {
            httpStatus = 200;
        }
        return res.status(httpStatus).json(foundUser);
    });
});

// Update route
router.put("/:id", function (req, res) {
    User.findByIdAndUpdate(req.params.id, req.body, function (err, updatedUser) {
        if (err) {
            console.log(err);
            httpStatus = 400;
        } else if (!updatedUser) {
            console.log('not found?');
            httpStatus = 404;
        } else {
            console.log(`success: ${updatedUser}`);
            httpStatus = 201;
        }
        return res.status(httpStatus).json(updatedUser);
    });
});

// Destroy Route
router.delete("/:id", function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            console.log(err);
            httpStatus = 400;
        } else {
            httpStatus = 204;
        }
        return res.status(httpStatus).json(req.params.id);
    });
});

module.exports = router;