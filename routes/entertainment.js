const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');


/* Models */
const User = require('../models/User');
const UserAudio = require('../models/UserAudio');


router.get('/', async (req, res) => {
    res.render('entertainment/home')
});


/* TV */

router.get('/tv', async (req, res) => {
    res.render('entertainment/tv')
});



/* MOVIES */

router.get('/movies', async (req, res) => {
    res.render('entertainment/movies')
});



/* AUDIO */

router.get('/audio', (req, res) => {
    res.render('entertainment/audio/home')
});

router.get('/audio/all', async (req, res) => {
    const audioFiles = await UserAudio.find()
    res.render('entertainment/audio/music', {audioFiles})
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