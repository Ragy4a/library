const { Router } = require('express');

const AuthorController = require('../controllers/authorController.js');
const { validateAuthor } = require('../middleware/validate.mw.js');
const router = new Router();

router
    .route('/')
    .get(AuthorController.getAllAuthors)
    .post(validateAuthor, AuthorController.createAuthor)
    .put(validateAuthor, AuthorController.updateAuthor);
router
    .route('/:authorId')
    .get(AuthorController.getAuthorById)
    .delete(AuthorController.deleteAuthor);

module.exports = router;