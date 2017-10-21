const express = require('express');
const passport = require('passport');
const { authController } = require('../controllers');

module.exports = () => {
  const authRouter = express.Router();

  authRouter.use('/register', authController.register);
  authRouter.use(
    '/login',
    passport.authenticate('local'),
    authController.login
  );
  authRouter.use('/logout', authController.logout);

  return authRouter;
};
