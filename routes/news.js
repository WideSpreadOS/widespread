const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const axios = require('axios')

/* Models */
const User = require('../models/User');


/* NEWS */

router.get('/', async (req, res) => {

    const options = {
        method: 'GET',
        url: 'https://newscatcher.p.rapidapi.com/v1/sources',
        params: { lang: 'en' },
        headers: {
            'x-rapidapi-host': 'newscatcher.p.rapidapi.com',
            'x-rapidapi-key': '7e45ec5e4fmsh4f3dac417f9eaa7p179a33jsnbfe4cb2e4c79'
        }
    };

    axios.request(options).then(function (response) {
        const returnedData = response.data;
        res.render('news/home', { subZone: "Home", zone: 'News', subZonePage: 'Home', returnedData })
    }).catch(function (error) {
        console.error(error);
    });
});

router.post('/search', (req, res) => {
    const term = req.body.searchQuery;
    res.redirect(`/news/search/${term}`);
});

router.get('/search/:searchTerm', (req, res) => {
    const searchTerm = req.params.searchTerm
    const options = {
        method: 'GET',
        url: 'https://newscatcher.p.rapidapi.com/v1/search_free',
        params: { q: `${searchTerm}`, lang: 'en', media: 'True' },
        headers: {
            'x-rapidapi-host': 'newscatcher.p.rapidapi.com',
            'x-rapidapi-key': '7e45ec5e4fmsh4f3dac417f9eaa7p179a33jsnbfe4cb2e4c79'
        }
    };

    axios.request(options).then(function (response) {
        const returnedData = response.data;
        res.render('news/search-results', { zone: 'News', subZone: null, returnedData, searchTerm })
    }).catch(function (error) {
        console.error(error);
    });
});



router.get('/local', async (req, res) => {
    res.render('news/local', { subZone: "Local", zone: 'News', subZonePage: 'Local' })
});

router.get('/national', async (req, res) => {
    res.render('news/national', { subZone: "National", zone: 'News', subZonePage: 'National' })
});

router.get('/international', async (req, res) => {
    res.render('news/international', { subZone: "International", zone: 'News', subZonePage: 'International' })
});

router.get('/business', async (req, res) => {
    res.render('news/business', { subZone: "Business", zone: 'News', subZonePage: 'Business' })
});

router.get('/health', async (req, res) => {
    res.render('news/health', { subZone: "Health", zone: 'News', subZonePage: 'Health' })
});

router.get('/technology', async (req, res) => {
    res.render('news/technology', { subZone: "Technology", zone: 'News', subZonePage: 'Technology' })
});

router.get('/politics', async (req, res) => {
    res.render('news/politics', { subZone: "Politics", zone: 'News', subZonePage: 'Politics' })
});

router.get('/events', async (req, res) => {
    res.render('news/events', { subZone: "Events", zone: 'News', subZonePage: 'Events' })
});


/* NEWS SEARCH */

router.get('/results', (req, res) => {
    res.render('news/results')
});


/* TV */

router.get('/local', async (req, res) => {
    res.render('news/local')
});



/* MOVIES */

router.get('/international', async (req, res) => {
    res.render('news/international')
});



/* AUDIO */

router.get('/health', (req, res) => {
    res.render('news/health')
});



/* NEWS */

router.get('/politics', (req, res) => {
    res.render('news/politics')
});

/* NEWS */

router.get('/sports', (req, res) => {
    res.render('news/sports')
});




/* HELP */

router.get('/help', (req, res) => {
    res.render('news/help')
});


module.exports = router;