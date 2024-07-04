const path = require('path')
const express = require('express');

const routers = require('./routers');

const { validationErrorHandler, errorHandler } = require('./middleware/errorHandlers.js');

const app = express();
app.use(express.json());
app.use(express.static(path.resolve('public')));

app.use(validationErrorHandler, errorHandler)
app.use(routers);

module.exports = app;