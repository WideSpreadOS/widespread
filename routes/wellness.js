const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');


/* Models */
const User = require('../models/User');
const UserAudio = require('../models/UserAudio');

/* HOME */

router.get('/', async (req, res) => {
    res.render('wellness/home', {subZone: "Home", zone: 'Wellness'})
});




/* FITNESS */

router.get('/fitness', async (req, res) => {
    res.render('wellness/fitness', {subZone: "Fitness", zone: 'Wellness', subZonePage: 'Home'})
});

router.get('/fitness/workout', async (req, res) => {
    res.render('wellness/fitness/workout', {subZone: "Fitness", zone: 'Wellness', subZonePage: 'Workout'})
});

router.get('/fitness/exercises', async (req, res) => {
    res.render('wellness/fitness/exercises', {subZone: "Fitness", zone: 'Wellness', subZonePage: 'Exercises'})
});

router.get('/fitness/plan', async (req, res) => {
    res.render('wellness/fitness/plan', {subZone: "Fitness", zone: 'Wellness', subZonePage: 'Plan'})
});

router.get('/fitness/history', async (req, res) => {
    res.render('wellness/fitness/history', {subZone: "Fitness", zone: 'Wellness', subZonePage: 'History'})
});

router.get('/fitness/help', async (req, res) => {
    res.render('wellness/fitness/help', {subZone: "Fitness", zone: 'Wellness', subZonePage: 'Help'})
});



/* YOGA */

router.get('/yoga', async (req, res) => {
    res.render('wellness/yoga', {subZone: "Yoga", zone: 'Wellness', subZonePage: 'Home'})
});

router.get('/yoga/learn', async (req, res) => {
    res.render('wellness/yoga/learn', {subZone: "Yoga", zone: 'Wellness', subZonePage: 'Learn'})
});

router.get('/yoga/classes', async (req, res) => {
    res.render('wellness/yoga/classes', {subZone: "Yoga", zone: 'Wellness', subZonePage: 'Classes'})
});

router.get('/yoga/news', async (req, res) => {
    res.render('wellness/yoga/news', {subZone: "Yoga", zone: 'Wellness', subZonePage: 'News'})
});

router.get('/yoga/history', async (req, res) => {
    res.render('wellness/yoga/history', {subZone: "Yoga", zone: 'Wellness', subZonePage: 'History'})
});

router.get('/yoga/help', async (req, res) => {
    res.render('wellness/yoga/help', {subZone: "Yoga", zone: 'Wellness', subZonePage: 'Help'})
});




/* NUTRITION */

router.get('/nutrition', async (req, res) => {
    res.render('wellness/nutrition', {subZonePage: 'Home', subZone: "Nutrition", zone: 'Wellness'})
});


router.get('/nutrition/diet', async (req, res) => {
    res.render('wellness/nutrition/diet', {subZonePage: 'Diet', subZone: "Nutrition", zone: 'Wellness'})
});


router.get('/nutrition/food', async (req, res) => {
    res.render('wellness/nutrition/food', {subZonePage: 'Food', subZone: "Nutrition", zone: 'Wellness'})
});


router.get('/nutrition/menu', async (req, res) => {
    res.render('wellness/nutrition/menu', {subZonePage: 'Menu', subZone: "Nutrition", zone: 'Wellness'})
});


router.get('/nutrition/history', async (req, res) => {
    res.render('wellness/nutrition/history', {subZonePage: 'History', subZone: "Nutrition", zone: 'Wellness'})
});


router.get('/nutrition/help', async (req, res) => {
    res.render('wellness/nutrition/help', {subZonePage: 'Help', subZone: "Nutrition", zone: 'Wellness'})
});




/* HEALTH */

router.get('/health', (req, res) => {
    res.render('wellness/health', {subZone: "Health", zone: 'Wellness', subZonePage: 'Your Health'})
});

router.get('/health/appointments', (req, res) => {
    res.render('wellness/health/appointments', {subZone: "Health", zone: 'Wellness', subZonePage: 'Appointments'})
});

router.get('/health/specialists', (req, res) => {
    res.render('wellness/health/specialists', {subZone: "Health", zone: 'Wellness', subZonePage: 'Specialists'})
});

router.get('/health/research', (req, res) => {
    res.render('wellness/health/research', {subZone: "Health", zone: 'Wellness', subZonePage: 'Research'})
});

router.get('/health/learn', (req, res) => {
    res.render('wellness/health/learn', {subZone: "Health", zone: 'Wellness', subZonePage: 'Learn'})
});

router.get('/health/history', (req, res) => {
    res.render('wellness/health/history', {subZone: "Health", zone: 'Wellness', subZonePage: 'History'})
});

router.get('/health/help', (req, res) => {
    res.render('wellness/health/help', {subZone: "Health", zone: 'Wellness', subZonePage: 'Help'})
});



/* NEWS */

router.get('/news', (req, res) => {
    res.render('wellness/news', {subZone: "News", zone: 'Wellness', subZonePage: 'Top'})
});

router.get('/news/new', (req, res) => {
    res.render('wellness/news/new', {subZone: "News", zone: 'Wellness', subZonePage: 'New'})
});

router.get('/news/categories', (req, res) => {
    res.render('wellness/news/categories', {subZone: "News", zone: 'Wellness', subZonePage: 'Categories'})
});




/* HELP */

router.get('/help', (req, res) => {
    res.render('wellness/help/all-categories', {subZone: "Help", zone: 'Wellness', subZonePage: 'Categories'})
});

router.get('/help/request', (req, res) => {
    res.render('wellness/help/request', {subZone: "Help", zone: 'Wellness', subZonePage: 'Contact Us'})
});


module.exports = router;