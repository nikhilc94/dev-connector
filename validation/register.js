
const validator = require('validator');


module.exports = validateRegisterInput = (data) => {

    const errors = {};

    data.name = data.name ? data.name : '';
    data.email = data.email ? data.email : '';
    data.password = data.password ? data.password : '';
    data.password2 = data.password2 ? data.password2 : '';


    if (!validator.isLength(data.name, { min: 2, max: 30 })) {
        errors.name = 'Name must be between 2 and 30 characters!';
    }

    if (validator.isEmpty(data.name)) {
        errors.name = 'Name field is required!';
    }

    if (validator.isEmpty(data.email)) {
        errors.email = 'Email field is required!';
    }

    if (!validator.isEmail(data.email)) {
        errors.email = 'Email is invalid!';
    }

    if (validator.isEmpty(data.password)) {
        errors.password = 'Password field is required!';
    }

    if (!validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = 'Password must be atleast 6 characters!';
    }

    if (validator.isEmpty(data.password2)) {
        errors.password2 = 'Confirm password field is required!';
    }

    if (!validator.equals(data.password, data.password2)) {
        errors.password2 = 'Passwords must match!';
    }

    return {
        isValid: !Object.keys(errors).length,
        errors
    }

};