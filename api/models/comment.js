const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    text: String,
    task: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task"
        }
    },
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

module.exports = mongoose.model("Comment", commentSchema);
