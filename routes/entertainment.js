const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const axios = require('axios');

/* Models */
const User = require('../models/User');
const UserAudio = require('../models/UserAudio');
const Movie = require('../models/Movie');
const Show = require('../models/Show');


router.get('/', async (req, res) => {
    res.render('entertainment/home', { subZone: "Home", zone: 'Entertainment'})
});


/* TV */

router.get('/tv', async (req, res) => {
    const shows = await Show.find()
    console.log(shows)
    const apiKey = process.env.TMDB_API_KEY
    const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}`
    };

    axios.request(options).then(function (response) {
        const returnedData = response.data.results;
        res.render('entertainment/tv/home', { subZone: "TV", zone: 'Entertainment', subZonePage: 'Home', returnedData, shows });
    }).catch(function (error) {
        console.error(error);
    });
});


/* SHOW MAIN */

router.get('/tv/show/:showId', (req, res) => {
    const showId = req.params.showId;
    const apiKey = process.env.TMDB_API_KEY
    const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/tv/${showId}?api_key=${apiKey}`
    };

    axios.request(options).then(function (response) {
        const returnedData = response.data;
        console.log(returnedData)
        res.render('entertainment/tv/show', { subZone: "TV", zone: 'Entertainment', subZonePage: '', returnedData, showId });
    }).catch(function (error) {
        console.error(error);
    });
})



/* SHOW SEASON */

router.get('/tv/show/:showId/:seasonId', (req, res) => {
    const showId = req.params.showId;
    const seasonId = req.params.seasonId;
    const apiKey = process.env.TMDB_API_KEY
    const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/tv/${showId}/season/${seasonId}?api_key=${apiKey}`
    };

    axios.request(options).then(function (response) {
        const returnedData = response.data;
        console.log(returnedData)
        res.render('entertainment/tv/season', { subZone: "TV", zone: 'Entertainment', subZonePage: '', returnedData, showId });
    }).catch(function (error) {
        console.error(error);
    });

})



/* SHOW EPISODE */

router.get('/tv/show/:showId/:seasonId/:episodeId', (req, res) => {
    const showId = req.params.showId;
    const seasonId = req.params.seasonId;
    const episodeId = req.params.episodeId;
    const apiKey = process.env.TMDB_API_KEY
    const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/tv/${showId}/season/${seasonId}/episode/${episodeId}?api_key=${apiKey}`
    };

    axios.request(options).then(function (response) {
        const returnedData = response.data;
        console.log(returnedData)
        res.render('entertainment/tv/episode', { subZone: "TV", zone: 'Entertainment', subZonePage: '', returnedData, showId });
    }).catch(function (error) {
        console.error(error);
    });
})






/* MOVIES */

router.get('/movies', async (req, res) => {
    const movies = await Movie.find()

    res.render('entertainment/movies/home', { subZone: "Movies", zone: 'Entertainment', subZonePage: 'Home', movies })
});



/* AUDIO */

router.get('/audio', (req, res) => {
    res.render('entertainment/audio/home', { subZone: "Audio", zone: 'Entertainment', subZonePage: 'Home' })
});

router.get('/audio/music', async (req, res) => {
    const audioFiles = await UserAudio.find()
    res.render('entertainment/audio/music', { subZone: "Audio", zone: 'Entertainment', subZonePage: 'Music', audioFiles})
});


/* NEWS */

router.get('/news', (req, res) => {
    res.render('entertainment/news/home')
});


/* JOB SEARCH */

router.get('/job-search', (req, res) => {
    res.render('academy/job-search/home')
});


/* INSIGHTS */

router.get('/insights', (req, res) => {
    res.render('entertainment/insights/home')
});


/* HELP */

router.get('/help', (req, res) => {
    res.render('entertainment/help/home')
});


module.exports = router;