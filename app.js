const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

const authenticationMiddleware = require('./middleware/authenticationMiddleware');
const mainErrorsHandlerMiddleware = require('./middleware/mainErrorsHandlerMiddleware');
const contactRoutes = require('./routes/contactRoutes')

const app = express();

// 1) GLOBAL MIDDLEWARES

// Set security HTTP headers
app.use(helmet());

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());


// 2) Authentication MIDDLEWARES
app.use(authenticationMiddleware)

// 3) Authenticated Routes
app.use('/api/v1/contacts', contactRoutes)


// 4) Errors Handler MIDDLEWARES
app.use(mainErrorsHandlerMiddleware)



module.exports = app;