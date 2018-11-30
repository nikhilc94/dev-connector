
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const express = require('express');
const passport = require('passport');
const gravatar = require('gravatar');


const User = require('../../models/User');
const keys = require('../../config/keys');

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

const router = express.Router();


// @route POST /api/users/register
// @desc Register user.
// @access Public

router.post('/register', async (req, res) => {
    try {

        const { isValid, errors } = validateRegisterInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }

        const { name, email, password } = req.body;

        let user = await User.findOne({ email });

        if (user) {
            errors.email = 'Email already exists!';
            return res.status(400).json({ errors });
        }

        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            default: 'mm'
        });

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            avatar,
            password: hashedPassword
        });

        user = await newUser.save();

        res.json(user);

    }
    catch(error) {
        console.log(error);
    }
});



// @route POST /api/users/login
// @desc Login user / Returning JWT token.
// @access Public

router.post('/login', async (req, res) => {
    try {

        const { isValid, errors } = validateLoginInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            errors.email = 'User not found!';
            return res.status(404).json({ errors });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            errors.password = 'Incorrect password!';
            return res.status(404).json({ errors });
        }        

        const payload = {
            id: user.id,
            name: user.name,
            avatar: user.avatar
        };

        const token = await jwt.sign(payload, keys.secret, { expiresIn: 3600 })

        res.json({
            status: true,
            token: `Bearer ${token}`
        });

    }
    catch (error) {
        console.log(error);
    }
});



// @route GET /api/users/current
// @desc Return current user.
// @access Private

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
});



module.exports = router;