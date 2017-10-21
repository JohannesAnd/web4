const passport = require('passport');
const User = require('../models/User');

module.exports = db => {
  return {
    register: (req, res, next) => {
      User.register(
        new User({ username: req.body.username }),
        req.body.password,
        err => {
          if (err) next(err);

          res.status(200).send('OK');
        }
      );
    },
    login: (req, res, next) => {
      res.status(200).send('OK');
    },
    logout: (req, res) => {
      req.logout();
      res.status(200).send('OK');
    }
  };
};
