const User = require('../models/user.model');
//const bcrypt = require('bcryptjs');
//const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    const { username, password } = req.body;

    try {
        // check if user already exists
        const existingUser = await User.findOne({ $or: [{ username }] });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        // create new user 
        const user = new User({
            username,
            password
        });

        /**
        // hashed passwords - only uncomment after testing is done
        // hash password before saving
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

         // generate token
        const token = jwt.sign({ userId: savedUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        */

        // save user to db
        const savedUser = await user.save();

       
        // response
        res.status(201).json({ message: `User '${savedUser.username}' with id=${savedUser._id} created successfully.` });
    } catch (error) {
        res.status(500).json({ message: "Error signing user up." });
    }
};



exports.login = async (req, res) => {
    const { username, password } = req.body;

    console.log('username:', username);
    console.log('password:', password);
  
    try {
        // check if user exists
        const user = await User.findOne({ username });
        console.log('user:', user);

        if (!user) {
            return res.status(401).json({ message: `Authentication for user ${username} failed` });
        }

        /** 
        // hashed passwords - only uncomment after testing is done
        // check if given password matches
        const passwordMatches = await bcrypt.compare(password, user.password);
        if (!passwordMatches) {
            return res.status(401).json({ message: `Authentication for user ${username} failed` });
        }

           // generate token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
       */

        // response
        return res.status(200).json({ message: `User '${user.username}' id=${user._id} logged in successfully.`});
    } catch (err) {
        return res.status(500).json({ message: `Error logging in user.` });
    }
};
