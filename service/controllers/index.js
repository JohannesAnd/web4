const models = {
  Pokemon: require('../models/Pokemon'),
  User: require('../models/User')
};

// Dependency injection for easier testing
module.exports.pokemonController = require('./pokemonController')(models);
module.exports.authController = require('./authController')(models);
module.exports.userController = require('./userController')(models);
