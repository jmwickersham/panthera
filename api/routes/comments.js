// Require Packages
const express = require("express");
const router = express.Router({mergeParams: true});

// Require JS Model Exports
let Comment = require("../models/comment"),
    Task    = require("../models/task");

// Comment Create
// TODO: Add middleware to check if user is logged in
router.post("/", function(req, res) {
    console.log(`inside post comment for ${req.params.id}`);

    // Find task by ID
    Task.findById(req.params.id, function(err, foundTask) {
        if (err) {
            console.log(err);
            httpStatus = 400;
            return res.status(httpStatus);
        }
        else if (!foundTask) {
            httpStatus = 404;
            return res.status(httpStatus);
        }
        else {
            Comment.create(req.body.comment, function(err, comment) {
                if (err) {
                    httpStatus = 400;
                }
                else {
                    // TODO: Add created by user after we add auth to route (may need to tweak below code)
                    // comment.created_by.id = req.user._id;
                    // comment.created_by.username = req.user.username;

                    // Save
                    comment.save();

                    // Add comment to task
                    foundTask.comments.push(comment);
                    foundTask.save();

                    httpStatus = 201;
                }
                return res.status(httpStatus).json(comment);
            });
        }
    });
});

// Destroy Route
router.delete("/:comment_id", function(req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function(err) {
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

