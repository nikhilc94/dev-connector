
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');


const User = require('../../models/User');
const Profile = require('../../models/Profile');

const validateProfileInput = require('../../validation/profile');



const router = express.Router();




// @route: GET /api/profile
// @desc: Get current user's profile
// @access: Private

router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {

        const errors = {};

        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar'])

        if (!profile) {
            errors.noProfile = 'There is no profile for this user!'
            return res.status(404).json({ errors });
        }

        res.json(profile);

    }
    catch (error) {
        console.log(error);
    }
});



// @route: POST /api/profile
// @desc: Create/Edit user profile.
// @access: Private

router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {

        const { isValid, errors } = validateProfileInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }

        const profileFields = {
            user: req.user.id,
            handle: req.body.handle ? req.body.handle : undefined,
            company: req.body.company ? req.body.company : undefined,
            website: req.body.website ? req.body.website : undefined,
            location: req.body.location ? req.body.location : undefined,
            status: req.body.status ? req.body.status : undefined,
            bio: req.body.bio ? req.body.bio : undefined,
            githubUsername: req.body.githubUsername ? req.body.githubUsername : undefined,
            skills: req.body.skills ? req.body.skills.split(',') : undefined,
            social: {
                youtube: req.body.youtube ? req.body.youtube : undefined,
                twitter: req.body.twitter ? req.body.twitter : undefined,
                linkedIn: req.body.linkedIn ? req.body.linkedIn : undefined,
                facebook: req.body.facebook ? req.body.facebook : undefined,
                instagram: req.body.instagram ? req.body.instagram : undefined
            }
        };

        const profile = await Profile.findOne({ user: req.user.id });

        // Update profile.
        if (profile) {
            const profile = await Profile.findOneAndUpdate({ user: req.user.id },
                { $set: profileFields },
                { new: true }
            );
            res.json(profile);
        }

        // Create profile.
        else {

            //Checking if handle exists.
            const profile = await Profile.findOne({ handle: profileFields.handle });

            if (profile) {
                errors.handle = 'Handle already exists!';
                res.status(400).json(errors);
            }

            const newProfile = await new Profile(profileFields).save();

            res.json(profile);

        }

    }
    catch (error) {
        console.log(error);
    }
});


module.exports = router;