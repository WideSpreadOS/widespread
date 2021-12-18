const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');


/* Models */
const User = require('../models/User');
const Course = require('../models/Course');
const Class = require('../models/Class');
const LearningPoint = require('../models/LearningPoint');

router.get('/', (req, res) => {
    res.render('academy/home')
});


/* COURSES */

router.get('/all-courses', async (req, res) => {
    const courses = await Course.find();
    res.render('academy/all-courses', {courses})
});

router.get('/course/:courseId', async (req, res) => {
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId).populate('classes').exec();
    const classes = await Class.find({"in_course": {$eq: courseId}})
    res.render('academy/course-main', {course, classes})
});


/* CLASSES */

router.get('/course/:courseId/class/:classId', async (req, res) => {
    const courseId = req.params.courseId;
    const classId = req.params.classId;
    const className = await Class.findById(classId);
    const learningPoints = await LearningPoint.find({"class": { $eq: classId } })
    res.render('academy/class-main', {className, learningPoints})

});


/* RESOURCES */

router.get('/resources', (req, res) => {
    res.render('academy/resources/home')
});


/* HOMEWORK */

router.get('/homework', (req, res) => {
    res.render('academy/homework/home')
});


/* TESTS */

router.get('/tests', (req, res) => {
    res.render('academy/tests/home')
});


/* STUDY */

router.get('/study', (req, res) => {
    res.render('academy/study/home')
});


/* HELP */

router.get('/help', (req, res) => {
    res.render('academy/help/home')
});


module.exports = router;