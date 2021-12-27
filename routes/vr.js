const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { ensureAuthenticated } = require('../config/auth');

const { readUserData, allUserPosts, getUserPosts } = require("../modules/user/user-data");

/* Models */
const User = require('../models/User');
const UserPhoto = require('../models/UserPhoto');



// VR Dashboard Page
router.get('/users/dashboard', ensureAuthenticated, async (req, res) => {
    const currentUser = req.user;
    const userId = req.user.id;
    const user = await User.findById(userId).populate('friends').exec()
    const userPhotos = await UserPhoto.find({'image_owner': {$eq: currentUser.id}})
        

    res.render('vr/dashboard', { layout: 'vr', currentPageTitle: 'VR', currentUser, userPhotos, user
 });
})


module.exports = router;