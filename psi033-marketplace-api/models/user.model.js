const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  profilePicture: { 
    type: String, 
    required: false,
    default: 'https://placehold.jp/e9bee4/ffffff/30x30.png' 
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
