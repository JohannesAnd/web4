const express = require('express');
const passport = require('passport');
const { authController } = require('../controllers');

module.exports = () => {
  const authRouter = express.Router();

  authRouter.post('/register', authController.register);
  authRouter.post('/logout', authController.logout);
  authRouter.post(
    '/login',
    passport.authenticate('local'),
    authController.login
  );

  return authRouter;
};
