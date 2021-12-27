const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { ensureAuthenticated } = require('../config/auth');

const { readUserData, allUserPosts, getUserPosts } = require("../modules/user/user-data");

/* Models */
const User = require('../models/User');
const Post = require('../models/Post');
const UserPhoto = require('../models/UserPhoto');



// VR Dashboard Page
router.get('/users/dashboard', ensureAuthenticated, async (req, res) => {
    const currentUser = req.user;
    const userId = req.user.id;
    const posts = await Post.find({'author': {$eq: userId}})
    console.log(`Posts: ${posts}`)
    const user = await User.findById(userId).populate('friends').exec()
    const userPhotos = await UserPhoto.find({'image_owner': {$eq: currentUser.id}})
        

    res.render('vr/dashboard', { layout: 'vr', currentPageTitle: 'VR', currentUser, userPhotos, user, posts
 });
})


module.exports = router;