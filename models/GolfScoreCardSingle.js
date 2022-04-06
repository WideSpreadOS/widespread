const mongoose = require('mongoose');


const GolfScoreCardSingleSchema = new mongoose.Schema({
    golf_bag: { type: mongoose.Schema.Types.ObjectId, ref: 'GolfBag' },
    player: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    handicap: Number,
    holes: [
        {
            hole_number: Number,
            strokes: Number
        }
    ]

});

const GolfScoreCardSingle = mongoose.model('GolfScoreCardSingle', GolfScoreCardSingleSchema);

module.exports = GolfScoreCardSingle;