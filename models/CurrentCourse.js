const mongoose = require('mongoose');

const CurrentCourseSchema = new mongoose.Schema({
    course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    quiz_scores: [{
            quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
            score: Number
    }],
    current_grade: {
        type: Number,
        default: 100
    },
    notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Notebook' }],
    bookmarked_learning_points: [{ type: mongoose.Schema.Types.ObjectId, ref: 'LearningPoint' }]


})

const CurrentCourse = mongoose.model('CurrentCourse', CurrentCourseSchema);

module.exports = CurrentCourse;