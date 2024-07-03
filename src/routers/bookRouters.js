const { Router } = require('express');

const BookController = require('../controllers/bookController.js');
const { validateBook } = require('../middleware/validate.mw.js');
const router = new Router();

router
    .route('/')
    .get(BookController.getAllBooks)
    .post(validateBook, BookController.createBook)
    .put(validateBook, BookController.updateBook);
router
    .route('/:bookId')
    .get(BookController.getBookById)
    .delete(BookController.deleteBook);

module.exports = router;