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
    res.render('admin/academy/home', { subZone: 'Home', zone: 'Academy' })
});














/* CLASS */

router.get('/academy/course/:courseId/class/:classId/quiz/', async (req, res) => {
    const courseId = req.params.courseId;
    const classId = req.params.classId;
    const course = await Course.findById(courseId)
    const className = await Class.findById(classId)
    const quiz = await Quiz.find({ 'for_class': { $eq: classId } });
    const learningPoints = await LearningPoint.find({ 'class': { $eq: classId } });
    res.render('admin/academy/course-class-quiz', { subZone: 'Courses', zone: 'Academy', subZonePage: course.course, currentPage: className.name, course, className, learningPoints, quiz})
});


/* CLASS QUIZ */

router.post('/academy/course/:courseId/class/:classId/quiz/create', async (req, res) => {
    const courseId = req.params.courseId;
    const classId = req.params.classId;
    const newQuiz = new Quiz({
        for_class: classId
    });
    newQuiz.save()
    res.redirect(`/admin/academy/course/${courseId}/class/${classId}/quiz`)
});


/* Add Questions to Quiz */
router.get('/academy/course/:courseId/class/:classId/quiz/:quizId/questions', async (req, res) => {
    const courseId = req.params.courseId;
    const classId = req.params.classId;
    const quizId = req.params.quizId;
    const course = await Course.findById(courseId)
    const className = await Class.findById(classId)
    const quiz = await Quiz.findById(quizId);
    const learningPoints = await LearningPoint.find({ 'class': { $eq: classId } });
    res.render('admin/academy/course-class-quiz-questions', { subZone: 'Courses', zone: 'Academy', subZonePage: course.course, currentPage: className.name, course, className, learningPoints, quiz })
});


router.post('/academy/course/:courseId/class/:classId/quiz/:quizId/questions/add', async (req, res) => {
    const courseId = req.params.courseId;
    const classId = req.params.classId;
    const quizId = req.params.quizId;
    const course = await Course.findById(courseId)
    const className = await Class.findById(classId)
    await Quiz.findByIdAndUpdate(quizId, {
        $addToSet: { 
            questions: { 
                question: req.body.question,
                "options.option1.possible_answer": req.body.possible_answer1,
                "options.option1.option_number": req.body.option_number1,
                "options.option2.possible_answer": req.body.possible_answer2,
                "options.option2.option_number": req.body.option_number2,
                "options.option3.possible_answer": req.body.possible_answer3,
                "options.option3.option_number": req.body.option_number3,
                "options.option4.possible_answer": req.body.possible_answer4,
                "options.option4.option_number": req.body.option_number4,
                answer: req.body.answer 
            } 
        } 
    });

    res.redirect(`/admin/academy/course/${courseId}/class/${classId}/quiz/${quizId}/questions`)
});
















module.exports = router;