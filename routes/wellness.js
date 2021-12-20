const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');


/* Models */
const User = require('../models/User');
const UserAudio = require('../models/UserAudio');


router.get('/', async (req, res) => {
    res.render('wellness/home', {subZone: "Home", zone: 'Wellness'})
});


/* TV */

router.get('/fitness', async (req, res) => {
    res.render('wellness/fitness', {subZone: "Fitness", zone: 'Wellness', subZonePage: 'Home'})
});

/* YOGA */

router.get('/yoga', async (req, res) => {
    res.render('wellness/yoga', {subZone: "Yoga", zone: 'Wellness', subZonePage: 'Home'})
});



/* MOVIES */

router.get('/nutrition', async (req, res) => {
    res.render('wellness/nutrition', {subZone: "Nutrition", zone: 'Wellness'})
});



/* AUDIO */

router.get('/health', (req, res) => {
    res.render('wellness/health', {subZone: "Health", zone: 'Wellness'})
});



/* NEWS */

router.get('/news', (req, res) => {
    res.render('wellness/news', {subZone: "News", zone: 'Wellness'})
});




/* HELP */

router.get('/help', (req, res) => {
    res.render('wellness/help', {subZone: "Help", zone: 'Wellness'})
});


module.exports = router;