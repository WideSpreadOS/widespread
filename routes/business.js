const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');


/* Models */
const User = require('../models/User');
const Company = require('../models/Company');


router.get('/', async (req, res) => {
    const allCompanies = await Company.find()
    res.render('business/home', {allCompanies})
});


/* WORK */

router.get('/work', async (req, res) => {
    res.render('business/work/home')
});


/* RESOURCES */

router.get('/resources', (req, res) => {
    res.render('business/resources/home')
});


/* NEWS */

router.get('/news', (req, res) => {
    res.render('business/news/home')
});


/* JOB SEARCH */

router.get('/job-search', (req, res) => {
    res.render('business/job-search/home')
});


/* INSIGHTS */

router.get('/insights', (req, res) => {
    res.render('business/insights/home')
});


/* HELP */

router.get('/help', (req, res) => {
    res.render('business/help/home')
});


module.exports = router;