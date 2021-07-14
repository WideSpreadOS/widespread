const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

// Welcome Page
router.get('/', (req, res) => {
    const currentUser = null
      res.render('welcome', {page: 'Welcome to WideSpread'});
  });

router.get('/icons', (req, res) => {
  res.render('icons')
});




  module.exports = router;