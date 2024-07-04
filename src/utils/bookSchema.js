const yup = require('yup');

const BOOK_VALIDATION = yup.object().shape({
    title: yup.string().required('The title of book is required!'),
    description: yup.string().nullable(),
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

module.exports = BOOK_VALIDATION;