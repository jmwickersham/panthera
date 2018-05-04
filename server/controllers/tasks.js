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
      } else {
        httpStatus = err ? 400 : 200;
        return res.status(httpStatus).json(allTasks);
      }
    });
  });
  
  // Show route - Shows more info about one task
  router.get("/:id", function (req, res, next) {
    // Find the task with provided ID
    Task.findById(req.params.id, function (err, foundTask) {
      if (err || !foundTask) {
        console.log(err);
      } else {
        httpStatus = err ? 400 : 200;
        return res.status(httpStatus).json(foundTask);
      }
    });
  });

module.exports = router;
