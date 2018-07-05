// Require Packages
const express = require("express");
const request = require("request");
const router = express.Router();
const clientID = process.env.TWITCH_CLIENT_ID;
const twitchURL = 'https://api.twitch.tv/helix';

// Routes
router.get("/user", function (req, res, next) {
    let id = req.query.id;
    let httpStatus = '';
    let twitchResponse = '';
    console.log('inside get Twitch user - id: ' + id);

    request({
            method: 'GET',
            uri: twitchURL + '/users?id=' + id,
            headers: {
                'Client-ID': clientID,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        },
        function (error, response, body) {
            if (response.statusCode == 201 || response.statusCode == 200) {
                twitchResponse = JSON.parse(body);

                if (twitchResponse.data) {
                    httpStatus = 200;
                    twitchResponse = twitchResponse.data;
                } 
                else {
                    httpStatus = 404;
                    twitchResponse = 'no user information retrieved';
                }
            } 
            else {
                httpStatus = response.statusCode;
                twitchResponse = 'error with get Twitch User request';
                console.log('error: ' + response.statusCode)
                console.log(body)
            }

            return res.status(httpStatus).json(twitchResponse);
        }
    );
});

router.get("/streams", function (req, res, next) {
    let id = req.query.id;
    let httpStatus = '';
    let twitchResponse = '';
    console.log('inside get Twitch streams - id: ' + id);

    request({
            method: 'GET',
            uri: twitchURL + '/streams?user_id=' + id,
            headers: {
                'Client-ID': clientID,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        },
        function (error, response, body) {
            if (response.statusCode == 201 || response.statusCode == 200) {
                twitchResponse = JSON.parse(body);

                if (twitchResponse.data) {
                    httpStatus = 200;
                    twitchResponse = twitchResponse.data;
                } 
                else {
                    httpStatus = 404;
                    twitchResponse = 'no game information retrieved';
                }
            } 
            else {
                httpStatus = response.statusCode;
                twitchResponse = 'error with get Steam Owned Games request';
                console.log('error: ' + response.statusCode)
                console.log(body)
            }

            return res.status(httpStatus).json(twitchResponse);
        }
    );
});

module.exports = router;
