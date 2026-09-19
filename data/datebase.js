const mongodb = require('../db/connect');

module.exports = {
  initDb: mongodb.initDb,
  getDatabase: mongodb.getDatabase
};
