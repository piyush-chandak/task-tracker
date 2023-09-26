const express = require('express');
const cors = require('cors');
const xss = require('xss-clean');
const routes = require('./routes');
const { NotFoundError } = require('./utils/customError');
const { errorHandler } = require('./middlewares/error');

const app = express();

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(
  cors({
    origin: '*',
    methods: 'GET,POST,PUT,PATCH,DELETE',
  })
);

// clean user input
app.use(xss())

// v1 api routes
app.use('/api', routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new NotFoundError('Route Not found'));
});

// handle error
app.use(errorHandler);

module.exports = app;
