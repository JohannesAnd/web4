module.exports = opts => {
  const { Pokemon } = opts;

  return {
    getAll: (req, res, next) =>
      Pokemon.find({ number: { $lt: '25' } })

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
      Pokemon.find(
        {
          name: {$regex: new RegExp('^'+req.body.name, "i")},
          number: {$gt: req.body.numberFrom, $lt: req.body.numberTo},
          $or: [{type_1: {$in: req.body.typeList}}, {type_2: {$in: req.body.typeList}}]
        })
        .then(pokemons => res.json(pokemons))
        .catch(err => next(err))
    }
  };
};
