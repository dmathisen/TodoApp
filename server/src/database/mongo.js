const { MongoClient } = require('mongodb');
const config = require('../config')

let database = null;

async function startDatabase() {
  const connection = await MongoClient.connect(config.database.url, config.database.options);
  database = connection.db();
}

async function getDatabase() {
  if (!database) await startDatabase();
  return database;
}

module.exports = {
  getDatabase,
  startDatabase,
};