const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const spotifyWebRouter = require('./routes/spotify-web');
app.use('/api', spotifyWebRouter);


app.listen(3001, () => console.info('===> Server ready. Open http://localhost:3001/api'));

module.exports = app;
