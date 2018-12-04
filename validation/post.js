
const validator = require('validator');


module.exports = validatePostInput = (data) => {

    const errors = {};

    data.text = data.text ? data.text : '';

    if (!validator.isLength(data.text, { min: 10, max: 300 })) {
        errors.text = 'Post must be between 10 and 300 characters!';
    }

    if (validator.isEmpty(data.text)) {
        errors.text = 'Text field is required!';
    }

    return {
        isValid: !Object.keys(errors).length,
        errors
    }

};