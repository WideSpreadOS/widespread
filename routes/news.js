const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');


/* Models */
const User = require('../models/User');


/* NEWS */

router.get('/', async (req, res) => {
    res.render('news/home', { subZone: "Home", zone: 'News', subZonePage: 'Home' })
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