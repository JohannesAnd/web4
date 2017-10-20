const db = { foo: 'bar' };

// Using dependency injection for easier testing and scalability
module.exports.userController = require('./userController')(db);
module.exports.authController = require('./authController')(db);
