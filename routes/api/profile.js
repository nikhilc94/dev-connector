
const express = require('express');
const passport = require('passport');


const User = require('../../models/User');
const Profile = require('../../models/Profile');

const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');



const router = express.Router();




// @route: GET /api/profile
// @desc: Get current user's profile
// @access: Private

router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {

        const errors = {};

        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar'])

        if (!profile) {
            errors.noprofile = 'There is no profile for this user!'
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



// @route: GET /api/profile/handle/:handle
// @desc: Get profile based on handle.
// @access: Public


router.get('/handle/:handle', async (req, res) => {
    try {

        const errors = {};

        const profile = await Profile.findOne({ handle: req.params.handle }).populate('user', ['name', 'avatar']);

        if (!profile) {
            errors.noprofile = 'There is no profile for this user.';
            return res.status(404).json(errors);
        }

        res.json(profile);

    }
    catch (error) {
        console.log(error);
    }
});



// @route: GET /api/profile/user/:user_id
// @desc: Get profile based on user id.
// @access: Public


router.get('/user/:user_id', async (req, res) => {
    try {

        const errors = {};

        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);

        if (!profile) {
            errors.noprofile = 'There is no profile for this user.';
            return res.status(404).json(errors);
        }

        res.json(profile);

    }
    catch (error) {
        console.log(error);
    }
});


// @route: GET /api/profile/all
// @desc: Get all profiles.
// @access: Public


router.get('/all', async (req, res) => {
    try {

        const errors = {};

        const profiles = await Profile.find().populate('user', ['name', 'avatar']);

        if (!profiles) {
            errors.noprofile = 'There are no profiles!';
            return res.status(404).json(error);
        }

    }
    catch (error) {
        console.log(error);
    }
});


// @route: POST /api/profile/experience
// @desc: Add experience to profile.
// @access: Private


router.post('/experience', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {

        const { isValid, errors } = validateExperienceInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }

        const profile = await Profile.findOne({ user: req.user.id });

        profile.experience.unshift({
            title: req.body.title,
            company: req.body.company,
            location: req.body.location,
            from: req.body.from,
            to: req.body.to,
            current: req.body.current,
            description: req.body.description
        });

        const updatedProfile = await profile.save();

        res.json(updatedProfile);

    }
    catch (error) {
        console.log(error);
    }
});



// @route: DELETE /api/profile/experience/:exp_id
// @desc: Delete experience from profile.
// @access: Private


router.delete('/experience/:exp_id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {

        const profile = await Profile.findOne({ user: req.user.id });

        profile.experience = profile.experience.filter(experience => experience.id !== req.params.exp_id);

        const newProfile = await profile.save();

        res.json(newProfile);

    }
    catch (error) {
        console.log(error);
    }
});



// @route: POST /api/profile/education
// @desc: Add education to profile.
// @access: Private


router.post('/education', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {

        const { isValid, errors } = validateEducationInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }

        const profile = await Profile.findOne({ user: req.user.id });

        profile.education.unshift({
            school: req.body.school,
            degree: req.body.degree,
            field: req.body.field,
            from: req.body.from,
            to: req.body.to,
            current: req.body.current,
            description: req.body.description
        });

        const updatedProfile = await profile.save();

        res.json(updatedProfile);

    }
    catch (error) {
        console.log(error);
    }
});



// @route: DELETE /api/profile/education/:edu_id
// @desc: Delete education from profile.
// @access: Private


router.delete('/education/:edu_id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {

        const profile = await Profile.findOne({ user: req.user.id });

        profile.education = profile.education.filter(education => education.id !== req.params.edu_id);

        const newProfile = await profile.save();

        res.json(newProfile);

    }
    catch (error) {
        console.log(error);
    }
});



// @route: DELETE /api/profile
// @desc: Delete user & profile.
// @access: Private


router.delete('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {

        await Profile.findOneAndRemove({ user: req.user.id });

        await User.findOneAndRemove({ _id: req.user.id });

        res.json({ success: true });

    }
    catch (error) {
        console.log(error);
    }
});



module.exports = router; 