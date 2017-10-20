const passport = require('passport');

module.exports = db => {
  return {
    login: (req, res, next) => {
      passport.authenticate('local', function(err, user, info) {
        if (err) return next(err);
        if (!user) return res.send(500, info.message);

        req.logIn(user, function(err) {
          if (err) return next(err);

          return res.send(201, user);
        });
      })(req, res, next);
    },
    logout: (req, res) => {
      req.logout();
      res.send(200, {
        status: 'OK'
      });
    }
  };
};
