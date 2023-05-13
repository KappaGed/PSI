const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String, required: true, maxlength: 200 },
    platform: { type: String, required: true },
    languages: { type: String, required: true },
    price: { type: Number, required: true },
    generalRating: {
        type: Number, default: 0, min: 0, max: 5, validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    },
    reviews: { type: [String], required: true },
    imageUrl: { type: String, required: true },
    otherImages: { type: [String], default: [] },
    videoLink: { type: String, default: '' },
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
