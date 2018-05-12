const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    short_description: String,
    description: String,
    created_by: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    updated_by: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("Task", taskSchema);
