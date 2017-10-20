const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const configPassport = require('./configs/passport');

const { authController } = require('./controllers');
const userRouter = require('./routes/userRoutes');

const app = express();

app.use(
  session({
    secret: 'some-secret',
    saveUninitialized: false,
    resave: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Parse cookies
app.use(cookieParser());

// Configure passport
configPassport();

app.use('/login', authController.login);
app.use('/logout', authController.logout);

app.use('/users', userRouter());

module.exports = app;
