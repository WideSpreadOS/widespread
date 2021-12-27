const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { ensureAuthenticated } = require('../config/auth');

const { readUserData, allUserPosts, getUserPosts } = require("../modules/user/user-data");

/* Models */
const User = require('../models/User');



// VR Dashboard Page
router.get('/users/dashboard', (req, res) => {
    const currentUser = req.user;
    let photoAlbum = currentUser.user_inspread_images;
    console.log(currentUser)


    res.render('vr/dashboard', { layout: 'vr', currentPageTitle: 'VR', currentUser });
})


module.exports = router;