const mongoose = require('mongoose');


const LearningPointSchema = new mongoose.Schema({
    class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
    section_header: String,
    section_body: String,
    section_notes: String,
    difficulty: Number
});

const LearningPoint = mongoose.model('LearningPoint', LearningPointSchema);

module.exports = LearningPoint;