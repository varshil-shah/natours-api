const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimiter = require('express-rate-limit');

const AppError = require('./utils/app-error');
const globalErrorHandler = require('./controllers/error-controller');

const tourRouter = require('./routes/tour-router');
const userRouter = require('./routes/user-router');

const app = express();

// set security http headers
app.use(helmet());

// limit request from same API
const limiter = rateLimiter({
  windowMs: 60 * 60 * 1000, // 1hr
  max: 100,
  message: 'Too many requests from this IP, please try again after an hour',
});

app.use('/api', limiter);

// body parser, reading data from body into req.body
// limiting amount of data comes in the body
app.use(express.json({ limit: '10kb' }));

// development logging
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// serving static files
app.use(express.static('public'));

// test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// GLOBAL ERRROR HANDLING MIDDLEWARE
app.use(globalErrorHandler);

module.exports = app;
