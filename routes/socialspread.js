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
    const allPosts = await Post.find().populate('author').populate(
        {
            path: 'comments',
            model: 'Comment',
            populate: {
                path: 'author',
                model: 'User'
            }
        }).exec()

    res.render('socialspread/home', { subZone: "Home", zone: 'SocialSpread', allPosts, user, userLikes })
});


/* HELP */

router.get('/help', (req, res) => {
    res.render('socialspread/help/home')
});


module.exports = router;