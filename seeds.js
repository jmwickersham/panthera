const mongoose = require("mongoose");
const Task     = require("./api/models/task");

let data = [
    {
        short_description: "Check out this cool new task!",
        description: "Next level crucifix single-origin coffee chartreuse blue bottle hell of messenger bag pinterest pitchfork flannel. Live-edge normcore celiac, biodiesel lyft kale chips salvia chartreuse cronut XOXO pitchfork trust fund microdosing. Umami disrupt glossier leggings ethical, cray wayfarers cardigan. Snackwave street art post-ironic try-hard truffaut pickled af."
    },
    {
        short_description: "Look at me doing stuff... yasssss",
        description: "Activated charcoal fanny pack sriracha, pabst adaptogen disrupt marfa PBR&B food truck shabby chic la croix whatever four dollar toast direct trade. Cronut kale chips twee, gastropub kitsch asymmetrical humblebrag pork belly. Godard green juice raclette, vice hammock yr keffiyeh heirloom. Post-ironic mlkshk fashion axe succulents whatever."
    }  
];

function seedDB() {
  // Remove all tasks
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
