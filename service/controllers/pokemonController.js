module.exports = opts => {
  const { Pokemon } = opts;

  return {
    getAll: (req, res, next) =>
      Pokemon.find({ number: { $lt: 25 } })
        .then(pokemons => res.json(pokemons))
        .catch(err => next(err)),

    getOne: (req, res, next) =>
      Pokemon.findOne({ _id: req.params.id })
        .then(pokemons => res.json(pokemons))
        .catch(err => next(err)),

    getByNumber: (req, res, next) =>
      Pokemon.find({ number: req.params.number })
        .then(pokemons => res.json(pokemons))
        .catch(err => next(err)),

    search: (req, res, next) => {
      return Pokemon.find({ $text: { $search: req.query.q } })
        .then(pokemons => res.json(pokemons))
        .catch(err => next(err));
    }
  };
};
