var mongoose = require("mongoose");
var Task = require("./server/models/task");

var data = [
    {
        short_description: "Test1",
        description: "Test1"
    },
    {
        short_description: "Test2",
        description: "Test2"
    }  
];

function seedDB() {
  // Remove all campgrounds
  Task.remove({}, function (err) {
    if (err) {
      console.log(err);
    } 
    else {
      console.log("removed tasks");

      // // Add a few tasks
      data.forEach(function (seed) {
        Task.create(seed, function (err, task) {
          if (err) {
            console.log(err);
          } else {
            console.log("added a task");
          }
        });
      });
    }
  });
}

module.exports = seedDB;
