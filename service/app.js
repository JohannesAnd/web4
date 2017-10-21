const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const configPassport = require('./configs/passport');
const configDatabase = require('./configs/database');

const userRouter = require('./routes/userRoutes');
const authRouter = require('./routes/authRoutes');

const app = express();

app.use(
  session({
    secret: 'some-secret',
    saveUninitialized: false,
    resave: true
  })
);

// Connect to mongodb
configDatabase();

// Configure passport
configPassport(passport);

app.use(passport.initialize());
app.use(passport.session());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Parse cookies
app.use(cookieParser());

// Add routes
app.use('/users', userRouter());
app.use('/', authRouter());

module.exports = app;
