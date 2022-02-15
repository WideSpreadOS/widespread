const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');


/* Models */
const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const Spread = require('../models/Spread');



router.get('/', async (req, res) => {
    const user = req.user;
    const postIds = await Post.find();
    
    let userLikes = []
    postIds.forEach(post => {
        user.likedPosts.forEach(likedPost => {
            if (likedPost == post.id) {
                userLikes.push(post.id)
            } else {
                return
            }

        })
    })
    console.log(userLikes)
    const allPosts = await Post.find().populate('author').sort({ createdAt: 'desc' }).populate(
        {
            path: 'comments',
            model: 'Comment',
            populate: {
                path: 'author',
                model: 'User'
            }
        }).exec()
    res.render('socialspread/home', { subZone: "Home", zone: 'SocialSpread', user, allPosts, userLikes })
});


router.get('/business', async (req, res) => {
    res.render('socialspread/business', { subZone: "Business", zone: 'SocialSpread', subZonePage: 'Home' })
});

router.get('/news', async (req, res) => {
    res.render('socialspread/news', { subZone: "News", zone: 'SocialSpread', subZonePage: 'Home' })
});

router.get('/hobbies', async (req, res) => {
    res.render('socialspread/hobbies', { subZone: "Hobbies", zone: 'SocialSpread', subZonePage: 'Home' })
});

router.get('/learning', async (req, res) => {
    res.render('socialspread/learning', { subZone: "Learning", zone: 'SocialSpread', subZonePage: 'Home' })
});

router.get('/help', async (req, res) => {
    res.render('socialspread/help', { subZone: "Help", zone: 'SocialSpread', subZonePage: 'Home' })
});


/* HELP */

router.get('/help', (req, res) => {
    res.render('socialspread/help/home')
});


module.exports = router;