const passport = require('passport');
const User = require('../models/User');

module.exports = db => {
  return {
    register: (req, res, next) => {
      User.register(
        new User({ username: req.body.username }),
        req.body.password,
        function(err) {
          if (err) {
            console.log('error while user register!', err);
            return next(err);
          }

          console.log('user registered!');

          res.send(200, { status: 'OK, user registered' });
        }
      );
    },
    login: (req, res, next) => {
      res.send(200, { status: 'OK, logged in' });
    },
    logout: (req, res) => {
      req.logout();
      res.send(200, {
        status: 'OK'
      });
    }
  };
};
