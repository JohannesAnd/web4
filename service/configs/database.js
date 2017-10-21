const mongoose = require('mongoose');

module.exports = () => {
  mongoose.Promise = Promise;

  mongoose.connect('mongodb://localhost:27017/web4', {
    useMongoClient: true
  });
};
