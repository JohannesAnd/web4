const mongoose = require('mongoose');

const PokemonSchema = mongoose.Schema({
  number: Number,
  name: String,
  primaryType: String,
  secondaryType: String,
  health: Number,
  attack: Number,
  defence: Number,
  specialAttack: Number,
  specialDefence: Number,
  speed: Number,
  generation: String,
  legendary: Boolean
});

PokemonSchema.index({ name: 'text' });

module.exports = mongoose.model('Pokemon', PokemonSchema);
