const mongoose = require('mongoose'),
      passport = require('passport');

// Require JS Model Exports
const User = require("../models/user");

// let sendJSONresponse = function(res, status, content) {
//     res.status(status);
//     res.json(content);
// };

module.exports.register = function(req, res) {
    // if (!req.body.name || !req.body.email || !req.body.password) {
    //     sendJSONresponse(res, 400, {
    //         "message": "All fields required"
    //     });
    //     return;
    // }

    let user = new User();
    user.first_name = req.body.first_name;
    user.last_name = req.body.last_name;
    user.username = req.body.username;

    user.setPassword(req.body.password);

    user.save(function(err) {
        let token;
        token = user.generateJwt();
        res.status(200);
        res.json({
            "token": token
        });
    });
};

module.exports.login = function(req, res) {
    // if (!req.body.email || !req.body.password) {
    //     sendJSONresponse(res, 400, {
    //         "message": "All fields required"
    //     });
    //     return;
    // }

    passport.authenticate('local', function(err, user, info) {
        let token;

        // If Passport throws/catches an error
        if (err) {
            res.status(404).json(err);
            return;
        }

        // If a user is found
        if (user) {
            token = user.generateJwt();
            res.status(200);
            res.json({
                "token": token
            });
        }
        else {
            // If user is not found
            res.status(401).json(info);
        }
    }) (req, res);
};
