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
const Company = require('../models/Company');
const Course = require('../models/Course');
const Class = require('../models/Class');
const LearningPoint = require('../models/LearningPoint');



// VR Dashboard Page
router.get('/users/dashboard', ensureAuthenticated, async (req, res) => {
    const currentUser = req.user;
    const userId = req.user.id;
    const posts = await Post.find({ 'author': { $eq: userId } }).sort({ createdAt: 'desc' }).limit(5)
    console.log(`Posts: ${posts}`)
    const user = await User.findById(userId).populate('friends').exec()
    const userPhotos = await UserPhoto.find({'image_owner': {$eq: currentUser.id}})
        

    res.render('vr/dashboard', { layout: 'vr', currentPageTitle: 'VR', currentUser, userPhotos, user, posts
 });
})


// Academy
router.get('/academy', async (req, res) => {
    const courses = await Course.find()
    res.render('vr/academy/home', { layout: 'vr', currentPageTitle: 'VR Academy', courses})
});


// Business
router.get('/business', async (req, res) => {
    const companies = Company.find()
    res.render('vr/business/home', { layout: 'vr', currentPageTitle: 'VR Business', companies })
});

// News
router.get('/news', async (req, res) => {

    res.render('vr/news/home', { layout: 'vr', currentPageTitle: 'VR Business' })
});

// Leisure
router.get('/leisure', async (req, res) => {

    res.render('vr/leisure/home', { layout: 'vr', currentPageTitle: 'VR Leisure' })
});

// Wellness
router.get('/wellness', async (req, res) => {

    res.render('vr/wellness/home', { layout: 'vr', currentPageTitle: 'VR Wellness' })
});

// Things
router.get('/things', async (req, res) => {

    res.render('vr/things/home', { layout: 'vr', currentPageTitle: 'VR Things' })
});

// Help
router.get('/help', async (req, res) => {

    res.render('vr/help/home', { layout: 'vr', currentPageTitle: 'VR Help' })
});



module.exports = router;