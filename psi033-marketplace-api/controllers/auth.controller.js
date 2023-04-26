const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = (req, res) => {
  const { username, password } = req.body;

  // hash the password
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ message: err });
    }

    // create new user
    const user = new User({
      username,
      password: hashedPassword,
    });

    // save new user in db
    user.save((err, user) => {
      if (err) {
        return res.status(500).json({ message: err });
      }

      // create a token for the new user
      const token = jwt.sign(
        { userId: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      // send the token as a response
      res.status(201).json({message: `User with id=${user._id} ('${user.username}') signed up successfully.`, token });    
    });

  });
};


exports.login = (req, res) => {
    const { username, password } = req.body;
  
    // find user in db
    User.findOne({ username }, (err, user) => {
      if (err) {
        return res.status(500).json({ message: err });
      }
  
      if (!user) {
        return res.status(401).json({ message: `Authentication for user with id=${user._id} (${username}) failed` });
      }
  
      // compare password with hashed password
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          return res.status(401).json({ message: `Authentication for user with id=${user._id} (${username}) failed` });
        }
  
        if (!result) {
          return res.status(401).json({ message: `Authentication for user with id=${user._id} (${username}) failed` });
        }
  
        // create a token for the authenticated user
        const token = jwt.sign(
          { userId: user._id, username: user.username },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
        );
  
        // send the token as a response
        res.status(200).json({ message: `User '${user.username}' (${user._id}) logged in successfully.`, token});
        });      

    });
  };
  
