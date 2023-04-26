const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
//const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // check if user already exists
        const existingUser = await User.findOne({ $or: [{ username }] });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        // create new user 
        const user = new User({
            username,
            email,
            password
        });

        /*
        // hash password before saving
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        */

        // save user to db
        const savedUser = await user.save();

        // response
        res.status(201).json({ message: `User '${savedUser.username}' with id=${savedUser._id} created successfully.` });
    } catch (error) {
        res.status(500).json({ message: "Error logging user in." });
    }
};



exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // check if user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: `Authentication for user ${username} failed` });
        }

        /** 
        // check if given password matches
        const passwordMatches = await bcrypt.compare(password, user.password);
        if (!passwordMatches) {
            return res.status(401).json({ message: `Authentication for user ${username} failed` });
        }
        */

        // response
        return res.status(200).json({ message: `User '${user.username}' id=${user._id} logged in successfully.` });
    } catch (err) {
        return res.status(500).json({ message: `Error logging in user '${user.username}' id=${user._id} logged in successfully.` });
    }
};
