const path = require('path')
const express = require('express');
const cors = require('cors');

const routers = require('./routers/index.js');

const { validationErrorHandler, errorHandler } = require('./middleware/errorHandlers.js');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve('public')));

app.use(routers);

app.use(validationErrorHandler, errorHandler)

module.exports = app;