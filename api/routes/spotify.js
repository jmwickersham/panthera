// Require Packages
const express = require("express");
const request = require("request");
const router = express.Router();
const spotifyAuth = process.env.SPOTIFY_AUTH;
const spotifyClientID = process.env.SPOTIFY_CLIENT_ID;
const spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const redirectUri = 'http://localhost:3000/callback';
const spotifyURL = 'https://api.spotify.com/v1';
const scopes = 'user-read-private user-read-email playlist-read-private user-library-read user-top-read playlist-read-collaborative user-follow-read user-read-playback-state user-read-currently-playing user-read-recently-played';

//const spotifyBasic = 'Basic ' + (btoa(clientID + ':' + clientSecret));

// Routes
router.get("/myInfo", function (req, res, next) {
    let httpStatus = '';
    let spotifyResponse = '';
    console.log('inside get Spotify Info');
    getAuthCode();

    request({
            method: 'GET',
            uri: spotifyUrl + '/me',
            headers: {
                'Authorization': token.toString(),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        },
        function (error, response, body) {
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
                spotifyResponse = 'error with get Spotify Info request';
                console.log('error: ' + response.statusCode)
                console.log(body)
            }

            return res.status(httpStatus).json(spotifyResponse);
        }
    );
});

router.get("/currentlyPlaying", function (req, res, next) {
    let httpStatus = '';
    let spotifyResponse = '';
    console.log('inside get currently playing games');

    request({
            method: 'GET',
            uri: spotifyUrl + '/me/player/currently-playing',
            headers: {
                'Authorization': token.toString(),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        },
        function (error, response, body) {
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

module.exports = router;

// Authorization Functions
function getAuthCode() {
    console.log('getAuthCode');

    request({
            method: 'GET',
            uri: 'https://accounts.spotify.com/authorize?client_id=' + spotifyClientID + '&response_type=code&redirect_uri=' + redirectUri + '&scope=' + scopes,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        },
        function (error, response, body) {
            console.log('getAuthCode - ' + JSON.stringify(response));

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
}

function getAPIToken() {
    const authCode = getAuthCode();
    const tokenURL = 'https://accounts.spotify.com/api/token';
    const grantType = 'grant_type=client_credentials';
    // , grantType, 
    // {
    //   headers: new HttpHeaders()
    //   .set('Authorization', spotifyBasic.toString())
    //   .set('Content-Type', 'application/x-www-form-urlencoded')
    //   .set('Accept', 'application/json')
    // }
    return token;
}

