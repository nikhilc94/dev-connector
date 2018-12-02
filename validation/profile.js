
const validator = require('validator');


module.exports = validateProfileInput = (data) => {

    const errors = {};

    data.handle = data.handle ? data.handle : '';
    data.status = data.status ? data.status : '';
    data.skills = data.skills ? data.skills : '';

    if (!validator.isLength(data.handle, { min: 2, max: 40 })) {
        errors.handle = 'Handle needs to be between 2 and 40 characters!';
    }

    if (validator.isEmpty(data.handle)) {
        errors.handle = 'Profile handle is required!';
    }

    if (validator.isEmpty(data.status)) {
        errors.status = 'Status field is required!';
    }

    if (validator.isEmpty(data.skills)) {
        errors.skills = 'Skills field is required!';
    }

    if (data.website && !validator.isURL(data.website)) {
        errors.website = 'URL is not valid!';
    }

    if (data.youtube && !validator.isURL(data.youtube)) {
        errors.youtube = 'URL is not valid!';
    }

    if (data.twitter && !validator.isURL(data.twitter)) {
        errors.twitter = 'URL is not valid!';
    }

    if (data.facebook && !validator.isURL(data.facebook)) {
        errors.facebook = 'URL is not valid!';
    }

    if (data.linkedIn && !validator.isURL(data.linkedIn)) {
        errors.linkedIn = 'URL is not valid!';
    }

    if (data.instagram && !validator.isURL(data.instagram)) {
        errors.instagram = 'URL is not valid!';
    }


    return {
        isValid: !Object.keys(errors).length,
        errors
    }

};