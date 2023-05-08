const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    _id: { type: Number, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    imageURL: { type: String, required: true },
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
