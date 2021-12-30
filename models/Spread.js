const mongoose = require('mongoose');


const SpreadSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text_post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    photo_post: {
        photo: { type: mongoose.Schema.Types.ObjectId, ref: 'UserPhoto' },
        photo_url: String,
        caption: String,
    },
    audio_post: { type: mongoose.Schema.Types.ObjectId, ref: 'UserAudio' },
    created_at: {
        type: Date,
        default: Date.now()
    },
    container_image: String,
    single_image: String,
    images: [String],
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