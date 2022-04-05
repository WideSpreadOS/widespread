const mongoose = require('mongoose');


const GolfHoleSchema = new mongoose.Schema({
    hole_number: {
        type: Number,
        required: true,
        unique: true

    },
    par: Number,
    tees: [
        {
            color: String,
            ll: {
                lat: String,
                long: String
            },
            distance: Number
        }
    ],
    pin: {
        lat: String,
        long: String
    }

});

const GolfHole = mongoose.model('GolfHole', GolfHoleSchema);

module.exports = GolfHole;