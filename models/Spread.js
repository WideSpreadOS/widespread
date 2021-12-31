const mongoose = require('mongoose');


const SpreadSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text_post: {
        spread_type: String,
        type: mongoose.Schema.Types.ObjectId, ref: 'Post'
    },
    article_post: {
        spread_type: String,
        type: mongoose.Schema.Types.ObjectId, ref: 'Article'
    },
    poll_post: {
        spread_type: String,
        type: mongoose.Schema.Types.ObjectId, ref: 'Poll'
    },
    question_post: {
        spread_type: String,
        type: mongoose.Schema.Types.ObjectId, ref: 'Question'
    },
    event_post: {
        spread_type: String,
        type: mongoose.Schema.Types.ObjectId, ref: 'Event'
    },
    photo_post: {
        spread_type: String,
        type: mongoose.Schema.Types.ObjectId, ref: 'UserPhoto',
        photo_url: String,
        caption: String,
    },
    audio_post: {
        spread_type: String,
        type: mongoose.Schema.Types.ObjectId, ref: 'UserAudio'
    },
    video_post: {
        spread_type: String,
        type: mongoose.Schema.Types.ObjectId, ref: 'UserVideo'
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    container_image: String,
    single_image: String,
    images: [String],
    tags: [String],
    business: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    comment_images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CommentImage' }],
    likes: Number,
    dislikes: Number,
    reactions: {
        funny: Number,
        amazed: Number,
        angry: Number,
        applause: Number,
        sad: Number,
        annoyed: Number
    }

});

const Spread = mongoose.model('Spread', SpreadSchema);

module.exports = Spread;