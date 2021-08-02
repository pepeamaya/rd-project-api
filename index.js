const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const cors = require('cors');
require('dotenv').config();

const credentials = {
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI
}

const app = express();
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.post('/login', (req, res) => {
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
        console.log(e);
        res.sendStatus(400);
    })
});

app.listen(3001);
