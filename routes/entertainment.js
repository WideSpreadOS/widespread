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
        const showName = returnedData.name;
        console.log(returnedData)
        res.render('entertainment/tv/show', { subZone: "TV", zone: 'Entertainment', subZonePage: showName, returnedData, showId });
    }).catch(function (error) {
        console.error(error);
    });
})



/* SHOW SEASON */

router.get('/tv/show/:showId/:seasonId', (req, res) => {
    const showId = req.params.showId;
    const seasonId = req.params.seasonId;
    const apiKey = process.env.TMDB_API_KEY

    axios.all([
        // Show Name
        axios.get(`https://api.themoviedb.org/3/tv/${showId}?api_key=${apiKey}`),
        // Season Data
        axios.get(`https://api.themoviedb.org/3/tv/${showId}/season/${seasonId}?api_key=${apiKey}`)
    ]).then(axios.spread((showData, seasonData) => {
        console.log(showData.data.name)
        const show = showData.data;
        const showName = show.name;
        const season = seasonData.data;
        const seasonName = season.name;
        console.log(`Show: ${showName} \n \n \n \n`)
        console.log(`Season: ${season.name} \n \n \n \n`)
        res.render('entertainment/tv/season', { subZone: "TV", zone: 'Entertainment', subZonePage: showName, currentPage: seasonName, show, season, showId });
    }))


})



/* SHOW EPISODE */

router.get('/tv/show/:showId/:seasonId/:episodeId', (req, res) => {
    const showId = req.params.showId;
    const seasonId = req.params.seasonId;
    const episodeId = req.params.episodeId;
    const apiKey = process.env.TMDB_API_KEY

    axios.all([
        // Show Name
        axios.get(`https://api.themoviedb.org/3/tv/${showId}?api_key=${apiKey}`),
        // Season Data
        axios.get(`https://api.themoviedb.org/3/tv/${showId}/season/${seasonId}?api_key=${apiKey}`),
        // Episode Data
        axios.get(`https://api.themoviedb.org/3/tv/${showId}/season/${seasonId}/episode/${episodeId}?api_key=${apiKey}`)

    ]).then(axios.spread((showData, seasonData, episodeData) => {
        console.log(showData.data.name)
        const show = showData.data;
        const showName = show.name;
        const season = seasonData.data;
        const seasonName = season.name;
        const episode = episodeData.data;
        console.log(`Episode: ${episode} \n \n \n \n`)
        res.render('entertainment/tv/episode', { subZone: "TV", zone: 'Entertainment', subZonePage: showName, currentPage: seasonName, show, season, showId, episode });

    }))
    
})






/* MOVIES */

router.get('/movies', async (req, res) => {
    const movies = await Movie.find()

    res.render('entertainment/movies/home', { subZone: "Movies", zone: 'Entertainment', subZonePage: 'Home', movies })
});

router.get('/movies/:movie', (req, res) => {
    const movie = req.params.movie;
    const apiKey = 'd3722e71'
    const options = {
        method: 'GET',
        url: `http://www.omdbapi.com/?apikey=${apiKey}&t=${movie}`
    };

    axios.request(options).then(function (response) {
        const returnedData = response.data;
        console.log(returnedData)
        res.render('entertainment/movies/title', { subZone: "Home", zone: 'Entertainment', returnedData, movie })
    }).catch(function (error) {
        console.error(error);
    });
});

router.get('/vr/movies/:movie', (req, res) => {
    const movie = req.params.movie;
    const apiKey = 'd3722e71'
    const options = {
        method: 'GET',
        url: `http://www.omdbapi.com/?apikey=${apiKey}&t=${movie}`
    };

    axios.request(options).then(function (response) {
        const returnedData = response.data;
        console.log(returnedData)
        res.render('entertainment/movies/vr-title', { layout: 'vr', subZone: "Home", zone: 'Entertainment', returnedData, movie })
    }).catch(function (error) {
        console.error(error);
    });
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