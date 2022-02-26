const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');


/* Models */
const User = require('../models/User');
const Course = require('../models/Course');
const CurrentCourse = require('../models/CurrentCourse');
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

router.get('/saved-courses', async (req, res) => {
    const userId = req.user
    const courses = await CurrentCourse.find({"user_id": {$eq: userId}}).populate({
        path: 'course_id',
        model: 'Course',
        populate: {
            path: 'classes',
            model: 'Class'
        }
    }).exec();
    console.log(courses)
    res.render('academy/courses/saved-courses', { subZone: 'Courses', zone: 'Academy', subZonePage: 'Home', courses})
});

router.get('/course/:courseId', ensureAuthenticated, async (req, res) => {
    const userId = req.user
    const user = await User.findById(userId)
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId).populate('classes').exec();
    const classes = await Class.find({"in_course": {$eq: courseId}})
    const courses = await Course.find()
    const currentCourses = await CurrentCourse.find({user_id: {$eq: userId}})
    const thisCourse = await CurrentCourse.find({user_id: {$eq: userId}} && {course_id: {$eq: courseId}})
    console.log(thisCourse)
    res.render('academy/courses/course-main', { subZone: 'Courses', zone: 'Academy', subZonePage: course.course, currentPage: 'Home', course, currentCourses, thisCourse, courseId, classes, user})
});



router.get('/course/:courseId/add', ensureAuthenticated, async (req, res) => {
    const courseId = req.params.courseId;
    const userId = req.user.id

    const addCourse = await new CurrentCourse({
        course_id: courseId,
        user_id: userId,
    })
    console.log(addCourse.academy_info)
    addCourse.save();    
    res.redirect(`/academy/course/${courseId}`)
})

/* CLASSES */

router.get('/course/:courseId/class/:classId', ensureAuthenticated, async (req, res) => {
    const courseId = req.params.courseId;
    const classId = req.params.classId;
    const course = await Course.findById(courseId).populate('classes').exec();
    const className = await Class.findById(classId);
    console.log(className)
    const learningPoints = await LearningPoint.find({"class": { $eq: classId } })
    const quizzes = await Quiz.find({'for_class': {$eq: classId}})
    res.render('academy/courses/class-main', { subZone: 'Courses', zone: 'Academy', subZonePage: course.course, currentPage: className.name, course, className, learningPoints, quizzes})

});



router.get('/course/:courseId/class/:classId/quiz/:quizId/take', ensureAuthenticated, async (req, res) => {
    const courseId = req.params.courseId;
    const classId = req.params.classId;
    const quizId = req.params.quizId;
    const course = await Course.findById(courseId).populate('classes').exec();
    const className = await Class.findById(classId);
    const quiz = await Quiz.findById(quizId);
    console.log(className)
    res.render('academy/courses/class-quiz', { subZone: 'Courses', zone: 'Academy', subZonePage: course.course, currentPage: className.name, course, className, quiz})

});

router.post('/course/:courseId/class/:classId/quiz/:quizId/submit', ensureAuthenticated, async (req, res) => {
    const courseId = req.params.courseId;
    const classId = req.params.classId;
    const quizId = req.params.quizId;
    const userId = req.user.id
    await User.findByIdAndUpdate(userId, {"academy_info.current_courses": {$eq: courseId}}, {
        $addToSet: {
            "quiz_scores.quiz": quizId,
            "quiz_scores.score": req.body.grade
 
        } 
    })
    const addQuiz = await User.findByIdAndUpdate(userId,
        { $addToSet: { "academy_info.current_courses": { $eq: courseId } } },
        { safe: true, upsert: true },
        function (err, doc) {
            if (err) {
                console.log(err)
            } else {
                return
            }
        }
    )
    console.log(addQuiz)
    addQuiz.save();  
    res.redirect(`/academy/course/${courseId}/class/${classId}`)
})
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