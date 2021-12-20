const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');


/* Models */
const User = require('../models/User');


router.get('/', async (req, res) => {
    res.render('news/home')
});


/* NEWS */

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