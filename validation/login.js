
const validator = require('validator');


module.exports = validateLoginInput = (data) => {

    const errors = {};

    data.email = data.email ? data.email : '';
    data.password = data.password ? data.password : '';

    if (!validator.isEmail(data.email)) {
        errors.email = 'Email is invalid!';
    }

    if (validator.isEmpty(data.email)) {
        errors.email = 'Email field is required!';
    }

    if (validator.isEmpty(data.password)) {
        errors.password = 'Password field is required!';
    }

    
    return {
        isValid: !Object.keys(errors).length,
        errors
    }

};