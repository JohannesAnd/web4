const express = require('express');
const { userController } = require('../controllers');
const ensureAuthenticated = require('../utils/ensureAuthenticated');

module.exports = () => {
  const userRouter = express.Router();

  userRouter.get('/', userController.getUsers);
  userRouter.post('/', userController.createUser);
  userRouter.get('/:id', ensureAuthenticated(), userController.getUser);
  userRouter.put('/:id', userController.updateUser);
  userRouter.delete('/:id', userController.deleteUser);

  return userRouter;
};
