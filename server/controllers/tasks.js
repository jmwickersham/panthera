// Require Packages
const express = require("express");
const router = express.Router();

// Require JS Model Exports
let Task = require("../models/task");

// Routes
router.get("/", function (req, res, next) {
    Task.find({}, function (err, allTasks) {
        if (err) {
            console.log(err);
            httpStatus = 400;
        }
        else {
            httpStatus = 200;
        }
        return res.status(httpStatus).json(allTasks);
    });
});

// Show route - Shows more info about one task
router.get("/:id", function (req, res, next) {
    // Find the task with provided ID
    Task.findById(req.params.id, function (err, foundTask) {
        if (err) {
            console.log(err);
            httpStatus = 400;
        } 
        else if (!foundTask) {
            httpStatus = 404;
        }
        else {
            httpStatus = 200;
        }
        return res.status(httpStatus).json(foundTask);
    });
});

// Create route - Add a new task to DB
router.post("/", function (req, res, next) {
    console.log(`post: ${JSON.stringify(req.body)}`);
    let newTask = {
        short_description: req.body.task.short_description,
        description: req.body.task.description
    };

    Task.create(newTask, function (err, newTask) {
        if (err) {
            console.log(err);
            httpStatus = 400;
        } 
        else {
            httpStatus = 201;
        }
        return res.status(httpStatus).json(newTask);
    });
});

// Update route
router.put("/:id", function(req, res) {
    // Find and update correct task
    console.log(`put: ${JSON.stringify(req.body)}`);
    Task.findByIdAndUpdate(req.params.id, req.body, function(err, updatedTask) {
        if (err) {
            console.log(err);
            httpStatus = 400;
        }
        else if (!updatedTask) {
            console.log('not found?');
            httpStatus = 404;
        }
        else {
            console.log(`success: ${updatedTask}`);
            httpStatus = 201;
        }
        return res.status(httpStatus).json(updatedTask);
    });
});

// Destroy Route
router.delete("/:id", function(req, res) {
    Task.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            console.log(err);
            httpStatus = 400;
        }
        else {
            httpStatus = 204;
        }
        return res.status(httpStatus);
    });
});

module.exports = router;
