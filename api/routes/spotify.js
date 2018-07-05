// Require Packages
const express = require("express");
const request = require("request");
const rp = require('request-promise');
const router = express.Router();

const spotifyClientID = process.env.SPOTIFY_CLIENT_ID;
const spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET;

const redirectUri = 'http://localhost:3000/api/spotify/callback';
const spotifyURL = 'https://api.spotify.com/v1';
const scopes = 'user-read-private user-read-email playlist-read-private user-library-read user-top-read playlist-read-collaborative user-follow-read user-read-playback-state user-read-currently-playing user-read-recently-played';

let spotifyAccessToken = process.env.SPOTIFY_ACCESS_TOKEN;

// Routes
router.get("/myInfo", function (req, res, next) {
    let httpStatus = '';
    let spotifyResponse = '';
    let state = generateRandomString(16);

    let authOptions = {
        uri: 'https://accounts.spotify.com/authorize?client_id=' + spotifyClientID + '&response_type=token&redirect_uri=' + redirectUri + '&scope=' + scopes + '&state=' + state,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        resolveWithFullResponse: true
    };

    let reqOptions = {
        uri: spotifyUrl + '/me',
        headers: {
            'Authorization': 'Bearer ' + spotifyAccessToken.toString(),
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        resolveWithFullResponse: true 
    };

    rp.get(authOptions)
        .then(function(body) {
            console.log("login OK: " + body);
        }).then(function() {
            return rp.get(reqOptions); // <-- inside a function
        }).then(function(body) {
            console.log("login OK again: " + body);
        }).catch(function (err) {
            console.error(err);
        });

    // request({
    //         method: 'GET',
    //         uri: spotifyUrl + '/me',
    //         headers: {
    //             'Authorization': 'Bearer ' + spotifyAccessToken.toString(),
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json'
    //         }
    //     },
    //     function (error, response, body) {
    //         console.log('inside get Spotify Info request');

    //         if (response.statusCode == 201 || response.statusCode == 200) {
    //             spotifyResponse = JSON.parse(body);

    //             if (spotifyResponse) {
    //                 httpStatus = 200;
    //                 spotifyResponse = spotifyResponse;
    //             } 
    //             else {
    //                 httpStatus = 404;
    //                 spotifyResponse = 'no information retrieved';
    //             }
    //         } 
    //         else {
    //             httpStatus = response.statusCode;
    //             spotifyResponse = 'error with get Spotify Info request';
    //             console.log('error: ' + response.statusCode)
    //             console.log(body)
    //         }

    //         return res.status(httpStatus).json(spotifyResponse);
    //     }
    // );
});

router.get("/currentlyPlaying", function (req, res, next) {
    let httpStatus = '';
    let spotifyResponse = '';

    request({
            method: 'GET',
            uri: spotifyUrl + '/me/player/currently-playing',
            headers: {
                'Authorization': 'Bearer ' + spotifyAccessToken.toString(),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        },
        function (error, response, body) {
            console.log('inside get currently playing song request');

            if (response.statusCode == 201 || response.statusCode == 200) {
                spotifyResponse = JSON.parse(body);

                if (spotifyResponse) {
                    httpStatus = 200;
                    spotifyResponse = spotifyResponse;
                } else {
                    httpStatus = 404;
                    spotifyResponse = 'no information retrieved';
                }
            } else {
                httpStatus = response.statusCode;
                spotifyResponse = 'error with get Spotify Currently Playing request';
                console.log('error: ' + response.statusCode)
                console.log(body)
            }

            return res.status(httpStatus).json(spotifyResponse);
        }
    );
});

router.get('/getToken', function(req, res, next) {
    let state = generateRandomString(16);

    request({
            method: 'GET',
            uri: 'https://accounts.spotify.com/authorize?client_id=' + spotifyClientID + '&response_type=token&redirect_uri=' + redirectUri + '&scope=' + scopes + '&state=' + state,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        },
        function (error, response, body) {
            console.log('inside get auth code');

            if (response.statusCode == 201 || response.statusCode == 200) {
                spotifyResponse = JSON.parse(body);

                if (spotifyResponse) {
                    spotifyResponse = spotifyResponse;
                }
            } 
            else {
                spotifyResponse = 'error with get Spotify Currently Playing request';
                console.log('error: ' + response.statusCode)
                console.log(body)
            }

            return body;
        }
    );
});

router.get("/callback", function (req, res, next) {
    console.log('inside spotify callback: ' + JSON.stringify(req));

    let code = req.query.code || null;
    let state = req.query.state || null;

    let params = {},
        queryString = location.hash.substring(1),
        regex = /([^&=]+)=([^&]*)/g,
        m;

    while (m = regex.exec(queryString)) {
        params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
    }

    process.env['SPOTIFY_ACCESS_TOKEN'] = params.access_token;

    console.log(params.state); // always compare this value
    console.log(params.access_token);
});

var generateRandomString = function (length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
};

function getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

module.exports = router;

// request({
//         method: 'POST',
//         uri: 'https://accounts.spotify.com/api/token',
//         form: {
//             code: code,
//             redirect_uri: redirectUri,
//             grant_type: 'authorization_code'
//         },
//         headers: {
//             'Authorization': 'Basic ' + (new Buffer(clientID + ':' + clientSecret).toString('base64')),
//             'Content-Type': 'application/x-www-form-urlencoded',
//             'Accept': 'application/json'
//         }
//     },
//     function (error, response, body) {
//         console.log('inside callback - ' + JSON.stringify(response));

//         if (response.statusCode == 201 || response.statusCode == 200) {
//             spotifyResponse = JSON.parse(body);

//             if (spotifyResponse) {
//                 spotifyResponse = spotifyResponse;
//             }
//         } 
//         else {
//             spotifyResponse = 'error with callback request';
//             console.log('error: ' + response.statusCode)
//             console.log(body)
//         }
//     }
// );