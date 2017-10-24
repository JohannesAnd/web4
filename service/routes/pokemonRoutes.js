const express = require('express');
const passport = require('passport');
const { pokemonController } = require('../controllers');
// const auth = require('../utils/ensureAuthenticated');

module.exports = () => {
  const pRouter = express.Router();

  pRouter.get('/', pokemonController.getAll);
  pRouter.get('/:id', pokemonController.getOne);
  pRouter.get('/number/:number', pokemonController.getByNumber);
  pRouter.get('/search', pokemonController.getAll);

  return pRouter;
};
