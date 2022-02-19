const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { ensureAuthenticated } = require('../config/auth');

const { readUserData, allUserPosts, getUserPosts } = require("../modules/user/user-data");

/* Models */
const User = require('../models/User');



// VR Dashboard Page
router.get('/sports/golf', ensureAuthenticated, async (req, res) => {
    const currentUser = req.user;
    const userId = req.user.id;

    const user = await User.findById(userId)


    res.render('ar', {
        layout: 'ar', currentPageTitle: 'AR', currentUser, user
    });
})


module.exports = router;