const { Router } = require('express');

const router = new Router();

const bookRouter = require('./bookRouters.js');
const authorRouter = require('./authorRouters.js');
const customerRouter = require('./customerRouters.js');

router.use('/books', bookRouter);
router.use('/authors', authorRouter);
router.use('/customers', customerRouter);

module.exports = router;