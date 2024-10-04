const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');



const SALT_LENGTH = 12;

// create a user and return the user and jwt token
router.post('/signup', async (req, res) => {
    try {
        // Check if the username is already taken
        const userInDatabase = await User.findOne({ username: req.body.username });
        if (userInDatabase) {
            return res.json({error: 'Username already taken.'});
        }
        // Create a new user with hashed password
        const user = await User.create({
            username: req.body.username,
            hashedPassword: bcrypt.hashSync(req.body.password, SALT_LENGTH),
            firstName: req.body.firstName,
            lastName: req.body.lastName
        })

        // create a token using the username and id
        const token = jwt.sign({ username: user.username, _id: user._id }, process.env.JWT_SECRET);
        res.status(201).json({ user, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// sign the user in and returns a token
router.post('/signin', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (user && bcrypt.compareSync(req.body.password, user.hashedPassword)) {
            const token = jwt.sign({ username: user.username, _id: user._id }, process.env.JWT_SECRET);
            res.status(200).json({ token });
        } else {
            res.status(401).json({ error: 'Invalid username or password.' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//gets and returns the user info
router.get('/profile/:userId', async (req,res) =>{
    try { 
        //find the user and populate there posts
        const user = await User.findById(req.params.userId).populate('posts')
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

module.exports = router;