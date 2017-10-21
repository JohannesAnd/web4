const express = require('express');
const passport = require('passport');
const { pokemonController } = require('../controllers');
const auth = require('../utils/ensureAuthenticated');

module.exports = () => {
  const pRouter = express.Router();

  pRouter.get('/', auth(), pokemonController.getAll);
  pRouter.get('/:id', auth(), pokemonController.getOne);
  pRouter.get('/number/:number', auth(), pokemonController.getByNumber);
  pRouter.post('/search', auth(), pokemonController.search);

  return pRouter;
};
