// Require Packages
const express = require("express");
const request = require("request");
const router = express.Router();
const steamKey = process.env.STEAM_KEY;
const steamURL = 'https://api.steampowered.com';

// Routes
router.get("/user", function (req, res, next) {
    let id = req.query.id;
    let httpStatus = '';
    let steamResponse = '';
    console.log('inside get Steam user - id: ' + id);

    request({
            method: 'GET',
            uri: steamURL + '/ISteamUser/GetPlayerSummaries/v2?key=' + steamKey + '&steamids=' + id
        },
        function (error, response, body) {
            if (response.statusCode == 201 || response.statusCode == 200) {
                steamResponse = JSON.parse(body);

                if (steamResponse.response.players) {
                    httpStatus = 200;
                    steamResponse = steamResponse.response.players;
                } 
                else {
                    httpStatus = 404;
                    steamResponse = 'no player information retrieved';
                }
            } 
            else {
                httpStatus = response.statusCode;
                steamResponse = 'error with get Steam User request';
                console.log('error: ' + response.statusCode)
                console.log(body)
            }

            return res.status(httpStatus).json(steamResponse);
        }
    );
});

router.get("/ownedGames", function (req, res, next) {
    let id = req.query.id;
    let httpStatus = '';
    let steamResponse = '';
    console.log('inside get owned Steam games - id: ' + id);

    request({
            method: 'GET',
            uri: steamURL + '/IPlayerService/GetOwnedGames/v1?key=' + steamKey + '&steamid=' + id + '&include_appinfo=1&include_played_free_games=1'
        },
        function (error, response, body) {
            if (response.statusCode == 201 || response.statusCode == 200) {
                steamResponse = JSON.parse(body);

                if (steamResponse.response) {
                    httpStatus = 200;
                    steamResponse = steamResponse.response;
                } 
                else {
                    httpStatus = 404;
                    steamResponse = 'no game information retrieved';
                }
            } 
            else {
                httpStatus = response.statusCode;
                steamResponse = 'error with get Steam Owned Games request';
                console.log('error: ' + response.statusCode)
                console.log(body)
            }

            return res.status(httpStatus).json(steamResponse);
        }
    );
});

router.get("/recentGames", function (req, res, next) {
    let id = req.query.id;
    let httpStatus = '';
    let steamResponse = '';
    console.log('inside get recent games - id: ' + id);

    request({
            method: 'GET',
            uri: steamURL + '/IPlayerService/GetRecentlyPlayedGames/v1?key=' + steamKey + '&steamid=' + id
        },
        function (error, response, body) {
            if (response.statusCode == 201 || response.statusCode == 200) {
                steamResponse = JSON.parse(body);

                if (steamResponse.response) {
                    httpStatus = 200;
                    steamResponse = steamResponse.response;
                } 
                else {
                    httpStatus = 404;
                    steamResponse = 'no game information retrieved';
                }
            } 
            else {
                httpStatus = response.statusCode;
                steamResponse = 'error with get Steam Recent Games request';
                console.log('error: ' + response.statusCode)
                console.log(body)
            }

            return res.status(httpStatus).json(steamResponse);
        }
    );
});

module.exports = router;
