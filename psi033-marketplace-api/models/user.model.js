const mongoose = require('mongoose');
const Game = require('./game.model');

const gameSchema = Game.schema;

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  profilePicture: { type: String, required: false, default: 'https://placehold.jp/0d1845/ffffff/150x150.png?text=%3AD' },
  cart: { type: [gameSchema], default: [] }
});

const User = mongoose.model('User', userSchema);

module.exports = User;