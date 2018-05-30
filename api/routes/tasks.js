// Require Packages
const express = require("express");
const router = express.Router();

// Require JS Model Exports
let Task = require("../models/task");

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

    Task.count({}, function(err, totalCount) {
        if (err) {
            response = {"error" : true, "message" : "Error fetching data"};
        }
        Task.find({}, {}, query, function (err, allTasks) {
            if (err) {
                console.log(err);
                httpStatus = 400;
            } else {
                httpStatus = 200;
                let totalPages = Math.ceil(totalCount / size);
                response = {
                    "data" : allTasks, 
                    metadata: {
                        "currentPage" : pageNo,
                        "totalPages" : totalPages,
                        "size": size
                    }
                };
            }
            return res.status(httpStatus).json(response);
        });
    });
});

// Show route - Shows more info about one task
router.get("/:id", function (req, res, next) {
    Task.findById(req.params.id).populate("comments").exec(function (err, foundTask) {
        if (err) {
            console.log(err);
            httpStatus = 400;
        } else if (!foundTask) {
            httpStatus = 404;
        } else {
            httpStatus = 200;
        }
        return res.status(httpStatus).json(foundTask);
    });
});

// Create route - Add a new task to DB
// TODO: Add Auth middleware to route
router.post("/", function (req, res, next) {
    // TODO: Add created by logged in user
    let newTask = {
        short_description: req.body.short_description,
        description: req.body.description
    };

    Task.create(newTask, function (err, newTask) {
        if (err) {
            console.log(err);
            httpStatus = 400;
        } else {
            httpStatus = 201;
        }
        return res.status(httpStatus).json(newTask);
    });
});

// Update route
// TODO: Add Auth middleware to route
router.put("/:id", function (req, res) {
    // TODO: Create Object to push instead of directly pushing the body and add updated by logged in user (may need to tweak below code)
    // let updatedTask = {
    //     short_description: req.body.short_description,
    //     description: req.body.description,
    //     updated_by.id: req.user._id,
    //     updated_by.username = req.user.username
    // };

    Task.findByIdAndUpdate(req.params.id, req.body, function (err, updatedTask) {
        if (err) {
            console.log(err);
            httpStatus = 400;
        } else if (!updatedTask) {
            console.log('not found?');
            httpStatus = 404;
        } else {
            console.log(`success: ${updatedTask}`);
            httpStatus = 201;
        }
        return res.status(httpStatus).json(updatedTask);
    });
});

// Destroy Route
router.delete("/:id", function (req, res) {
    Task.findByIdAndRemove(req.params.id, function (err) {
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