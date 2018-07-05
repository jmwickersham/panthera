// Require Packages
const express = require("express");
const request = require("request");
const router = express.Router();
const bnetAPIKey = process.env.BATTLENET_KEY;
const bnetURL = 'https://us.api.battle.net';
const wowCharacter = 'pants';
const wowServer = 'gnomeregan';
const wowCharacterFields = 'fields=guild,titles,stats,talents&';

// Routes
router.get("/wow/character", function (req, res, next) {
    let httpStatus = '';
    let bnetResponse = '';
    console.log('inside get wow character');;

    request({
            method: 'GET',
            uri: bnetURL + '/wow/character/' + wowServer + '/' + wowCharacter + '?' + wowCharacterFields + 'locale=en_US&apikey=' + bnetAPIKey
        },
        function (error, response, body) {
            if (response.statusCode == 201 || response.statusCode == 200) {
                bnetResponse = JSON.parse(body);

                if (bnetResponse) {
                    httpStatus = 200;
                    bnetResponse = bnetResponse;
                } 
                else {
                    httpStatus = 404;
                    bnetResponse = 'no character information retrieved';
                }
            } 
            else {
                httpStatus = response.statusCode;
                bnetResponse = 'error with get wow character request';
                console.log('error: ' + response.statusCode)
                console.log(body)
            }

            return res.status(httpStatus).json(bnetResponse);
        }
    );
});

module.exports = router;
