const yup = require('yup');

const AUTHOR_VALIDATION = yup.object().shape({
    full_name: yup.string().required('The fullname is required!'),
    email: yup.string(),
    createdAt: yup
        .date('This field must be a date.')
        .min('1850-01-01', 'Too old!')
        .max('2024-01-01', 'Too young!')
        .nullable(),
    updatedAt: yup
        .date('This field must be a date.')
        .min('1850-01-01', 'Too old!')
        .max('2024-01-01', 'Too young!')
        .nullable(),
});

module.exports = AUTHOR_VALIDATION;