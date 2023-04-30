const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  profilePicture: { 
    type: String, 
    required: false,
    default: '../profile-pictures/default-pic.jpg' 
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
