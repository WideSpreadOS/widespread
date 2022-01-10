const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');


/* Models */
const User = require('../models/User');
const Company = require('../models/Company');


router.get('/', async (req, res) => {
    res.render('things/home', { subZone: 'Home', zone: 'Things', subZonePage: 'Home' })
});






module.exports = router;