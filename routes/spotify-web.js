const express = require('express');
const router = express.Router();
const SpotifyWebApi = require('spotify-web-api-node');
require('dotenv').config();

const credentials = {
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI
}
const spotifyApi = new SpotifyWebApi(credentials);

router.post('/login', async (req, res) => {
    const code = req.body.code;
    // Retrieve an access token and a refresh token
    try {
        let data = await spotifyApi.authorizationCodeGrant(code);
        spotifyApi.setAccessToken(data.body.access_token);
        res.sendStatus(201); // session created
    }
    catch (err) {
        return res.status(500).send({
            message: err.message
        });
    }
});

router.delete('/logout', (req, res) => {
    if (spotifyApi.getAccessToken()) {
        spotifyApi.resetAccessToken();
        res.sendStatus(205); // session deleted return no content, refresh
    } else {
        return res.status(403).send({
            message: 'Error: No token provided'
        })
    }
});

router.get('/albums', async (req, res) => {
    let search = null;
    try {
        search = decodeURIComponent(req.query.search);
    } catch (err) {
        return res.status(500).send({
            message: err.message
        });
    }
    if (search) {
        try {
            // Search for an album
            const respSearchAlbum = await spotifyApi.searchAlbums(search);
            const data = respSearchAlbum.body.albums.items.map(item => {
                const image = item.images.reduce(reducer, item.images[0]);
                const album = createAlbum(item, image);
                return album;
            });
            res.send(data);
        } catch (err) {
            return res.status(500).send({
                message: err.message
            });
        }
    } else {
        try {
            // Retrieve the albums that are saved to the authenticated users
            const respMySavedAlbums = await spotifyApi.getMySavedAlbums();
            const data = respMySavedAlbums.body.items.map(item => {
                const image = item.album.images.reduce(reducer, item.album.images[0]);
                const album = createAlbum(item.album, image);
                return album;
            });
            res.send(data);
        } catch (err) {
            return res.status(500).send({
                message: err.message
            });
        }   
    }
});

const reducer = (biggest, image) => {
    if (image.height > biggest.height) {
        return image;
    } else {
        return biggest;
    }
};

function createAlbum(data, bestImage) {
    return {
        title: data.name,
        artist: data.artists[0].name,
        uri: data.uri,
        albumUrl: bestImage.url,
        totalTracks: data.total_tracks,
    };
}

module.exports = router;
