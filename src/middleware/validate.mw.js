const BOOK_SCHEMA = require('../utils/bookSchema.js');
const AUTHOR_SCHEMA = require('../utils/authorSchema.js');
const CUSTOMER_SCHEMA = require('../utils/customerSchema.js');

module.exports.validateBook = async (req, res, next) => {
    const { body } = req;
    try {
        const validatedBook = await BOOK_SCHEMA.validate(body);
        req.body = validatedBook;
        next();
    } catch ({ errors }) {
        next(`Error is: ${errors}!`);
    }
};

module.exports.validateAuthor = async (req, res, next) => {
    const { body } = req;
    try {
        const validatedAuthor = await AUTHOR_SCHEMA.validate(body);
        req.body = validatedAuthor;
        next();
    } catch ({ errors }) {
        next(`Error is: ${errors}!`);
    }
};

module.exports.validateCustomer = async (req, res, next) => {
    const { body } = req;
    try {
        const validatedCustomer = await CUSTOMER_SCHEMA.validate(body);
        req.body = validatedCustomer;
        next();
    } catch ({ errors }) {
        next(`Error is: ${errors}!`)
    }
};