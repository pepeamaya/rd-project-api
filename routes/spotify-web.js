const express = require('express');
const router = express.Router();
const SpotifyWebApi = require('spotify-web-api-node');
require('dotenv').config();

const credentials = {
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI
}

router.get('/', (req, res) => {
    console.info('Ok');
    res.sendStatus(200);
});

router.post('/login', (req, res) => {
    const code = req.body.code;
    const spotifyApi = new SpotifyWebApi(credentials);

    // Retrieve an access token and a refresh token
    spotifyApi.authorizationCodeGrant(code)
    .then(data => {
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in,
        })
    })
    .catch((e) => {
        res.sendStatus(400);
        throw new Error(`Trying to get auth code grand ${e}`);
    })
});

router.get('*', (req, res) => {
    console.info('Not Found');
    res.sendStatus(404);
});

module.exports = router;
