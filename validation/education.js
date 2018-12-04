
const validator = require('validator');


module.exports = validateEducationInput = (data) => {

    const errors = {};

    data.school = data.school ? data.school : '';
    data.degree = data.degree ? data.degree : '';
    data.field = data.field ? data.field : '';
    data.from = data.from ? data.from : '';

    if (validator.isEmpty(data.school)) {
        errors.school = 'School field is required!';
    }

    if (validator.isEmpty(data.degree)) {
        errors.degree = 'Degree field is required!';
    }

    if (validator.isEmpty(data.field)) {
        errors.field = 'Field of study field is required!';
    }

    if (validator.isEmpty(data.from)) {
        errors.from = 'From date field is required!';
    }

    return {
        isValid: !Object.keys(errors).length,
        errors
    }

};