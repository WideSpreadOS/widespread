const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');


/* Models */
const User = require('../models/User');
const Course = require('../models/Course');
const Class = require('../models/Class');
const LearningPoint = require('../models/LearningPoint');
const Flashcard = require('../models/Flashcard');
const Quiz = require('../models/Quiz');

router.get('/', (req, res) => {
    res.render('academy/home', {subZone: 'Home', zone: 'Academy'})
});


/* COURSES */

router.get('/all-courses', async (req, res) => {
    const courses = await Course.find().populate('classes').exec();
    console.log(courses)
    res.render('academy/courses/all-courses', { subZone: 'Courses', zone: 'Academy', subZonePage: 'Home', courses})
});

router.get('/course/:courseId', async (req, res) => {
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId).populate('classes').exec();
    const classes = await Class.find({"in_course": {$eq: courseId}})
    console.log(course)
    console.log(classes)
    res.render('academy/courses/course-main', { subZone: 'Courses', zone: 'Academy', subZonePage: course.course, currentPage: 'Home', course, classes})
});


/* CLASSES */

router.get('/course/:courseId/class/:classId', async (req, res) => {
    const courseId = req.params.courseId;
    const classId = req.params.classId;
    const course = await Course.findById(courseId).populate('classes').exec();
    const className = await Class.findById(classId);
    console.log(className)
    const learningPoints = await LearningPoint.find({"class": { $eq: classId } })
    res.render('academy/courses/class-main', { subZone: 'Courses', zone: 'Academy', subZonePage: course.course, currentPage: className.name, course, className, learningPoints})

});



router.get('/course/:courseId/class/:classId/quiz/take', async (req, res) => {
    const courseId = req.params.courseId;
    const classId = req.params.classId;
    const course = await Course.findById(courseId).populate('classes').exec();
    const className = await Class.findById(classId);
    const quiz = await Quiz.find({'for_class': {$eq: classId}});
    console.log(className)
    res.render('academy/courses/class-quiz', { subZone: 'Courses', zone: 'Academy', subZonePage: course.course, currentPage: className.name, course, className, quiz})

});


/* RESOURCES */

router.get('/resources', (req, res) => {
    res.render('academy/resources/home', { subZone: 'Resources', zone: 'Academy' })
});


/* HOMEWORK */

router.get('/homework', (req, res) => {
    res.render('academy/homework/home', { subZone: 'Homework', zone: 'Academy' })
});


/* TESTS */

router.get('/tests', (req, res) => {
    res.render('academy/tests/home', { subZone: 'Tests', zone: 'Academy' })
});


/* STUDY */

router.get('/study', (req, res) => {
    res.render('academy/study/home', { subZone: 'Study', zone: 'Academy' })
});


/* HELP */

router.get('/help', (req, res) => {
    res.render('academy/help/home', { subZone: 'Help', zone: 'Academy' })
});


module.exports = router;