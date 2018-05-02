var mongoose = require("mongoose");

var taskSchema = new mongoose.Schema({
    short_description: String,
    description: String
});

module.exports = mongoose.model("Task", taskSchema);