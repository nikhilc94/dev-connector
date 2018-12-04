
const validator = require('validator');


module.exports = validateExperienceInput = (data) => {

    const errors = {};

    data.title = data.title ? data.title : '';
    data.company = data.company ? data.company : '';
    data.from = data.from ? data.from : '';

    if (validator.isEmpty(data.title)) {
        errors.title = 'Job title is required!';
    }

    if (validator.isEmpty(data.company)) {
        errors.company = 'Company field is required!';
    }

    if (validator.isEmpty(data.from)) {
        errors.from = 'From date field is required!';
    }

    return {
        isValid: !Object.keys(errors).length,
        errors
    }

};