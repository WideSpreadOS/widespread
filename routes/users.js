const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const {ensureAuthenticated } = require('../config/auth');

const { readUserData, allUserPosts, getUserPosts } = require("../modules/user/user-data");

/* Models */
const User = require('../models/User');



// Login Page
router.get('/login', (req, res) => {
    const currentUser = null
    res.render('login', {currentPageTitle: 'Login', currentUser});
})
// Register Page
router.get('/register', (req, res) => {
    const currentUser = null
    res.render('register', {currentPageTitle: 'Register', currentUser});
})

// Register Handle
router.post('/register', (req, res) => {
    const {fname, lname, email, password, password2 } = req.body;
    let errors = [];

    // Check required fields
    if(!fname || !lname || !email || !password || !password2) {
        errors.push({ msg: 'Please fill in all fields'})
    }
    // Check passwords match
    if (password !== password2) {
        errors.push({ msg: 'Passwords do not match'})
    }

    // Check password length
    if (password.length < 6) {
        errors.push({ msg: 'Password should be at least 6 characters'})
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            fname,
            lname,
            email,
            password,
            password2
        });
    } else {
        // Validation Pass
        User.findOne({ email: email })
        .then(user => {
            if (user) {
                // User Exists
                errors.push({ msg: 'Email is already registered'})
                res.render('register', {
                    errors,
                    fname,
                    lname,
                    email,
                    password,
                    password2
                });
            } else {
                const newUser = new User({
                    fname,
                    lname,
                    email,
                    password
                });
                bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    // Set password to hashed
                    newUser.password = hash;
                    // Save user
                    newUser.save()
                        .then(user => {
                            req.flash('success_msg', 'You are now registered and can log in');
                            res.render('login', {currentPageTitle: 'Login'});
                        })
                        .catch(err => console.log(err));

                }))
            }
        })
        .catch();
    }
})


// Login Handle
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/users/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

// Logout Handle
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login')
});


router.get('/test', ensureAuthenticated, async (req, res) => {
    const userId = req.user.id;
    const user = await User.findById(userId);
    
    readUserData(userId).then(userData => {

        getUserPosts(userId).then( data => {
            console.log(`\n \n \n \n \n \n \n \n \n \nDATA: ${user}`)
            res.render('test-page', {userData, data})
        }
        )
    })
});


router.get('/dashboard', ensureAuthenticated, (req, res) => {
    const user = req.user;
    const userId = req.user.id;
    res.render('users/user-dashboard', {pageTitle: 'Dashboard', user});
});

router.get('/update-profile', ensureAuthenticated, (req, res) => {
    const user = req.user;
    res.render('users/update-profile', {pageTitle: 'Update Your Profile', user})
});

router.patch('/update-profile', ensureAuthenticated, async (req, res) => {
    const userId = req.user.id;
    const data = req.body;
    await User.findByIdAndUpdate(userId, data);
    res.redirect(req.get('referer'));
});

router.delete('/delete', ensureAuthenticated, async (req, res) => {
    const user = req.user.id;
    await User.findByIdAndDelete(user);
    res.redirect('/users/login')
});

module.exports = router;