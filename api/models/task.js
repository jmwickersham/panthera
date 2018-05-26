const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    short_description: String,
    description: String,
    status: {
        type: String,
        enum: ['New','In Progress','Blocked','On Hold','Complete']
    },
    category: {
        type: String,
        enum: ['Category1','Category2','Category3']
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
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
