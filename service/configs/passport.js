const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

module.exports = () => {
  passport.use(
    new LocalStrategy(function(username, password, done) {
      return done(null, { id: 123, name: 'Johannes' });
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, 123);
  });

  // Required for retrieving user from session
  passport.deserializeUser(function(id, done) {
    // The user should be queried against db
    // using the id
    done(null, { id: 123, name: 'Johannes' });
  });
};
