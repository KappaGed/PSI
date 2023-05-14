const mongoose = require('mongoose');
const Game = require('./game.model');

const gameSchema = Game.schema;

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  profilePicture: { type: String, required: false, default: 'https://img.freepik.com/free-vector/cute-shiba-inu-dog-gamer-holding-keyboard-with-headphone-cartoon-vector-icon-illustration-animal_138676-5551.jpg?w=826&t=st=1684000508~exp=1684001108~hmac=7bae87bc4c05461a3e09bfdf12685176f75abb227778152ee472440da3728658' },
  cart: { type: [gameSchema], default: [] },
  wishlist: { type: [gameSchema], default: [] }
});

const User = mongoose.model('User', userSchema);

module.exports = User;