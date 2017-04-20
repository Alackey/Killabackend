/*eslint spaced-comment:0*/
const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compression = require('compression');

// Get route files
const weather = require('./routes/weather');
const transportation = require('./routes/transportation');
const amenities = require('./routes/amenities');
const realestate = require('./routes/realestate');
const crime = require('./routes/crime');


const app = express();

const env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env === 'development';

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(cookieParser());

// compress all responses
app.use(compression());

// Add routes
app.use('/weather', weather);
app.use('/transportation', transportation);
app.use('/amenities', amenities);
app.use('/realestate', realestate);
app.use('/crime', crime);

/// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// error handlers

// development error handler
// will print stacktrace

if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
      title: 'error',
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
    title: 'error',
  });
});


module.exports = app;
