const { MongoClient } = require('mongodb');
const debug = require('debug')('app:connection');

function queryAppdb(query) {
  let result;
  const url = 'mongodb://localhost:27017';
  const dbName = 'libraryApp';
  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(url);
      debug('conected to mongodb');
      const db = await client.db(dbName);
    } catch (err) {
      debug(err.stack);
    }
    client.close();
  }());
  return result;
}

module.exports = queryAppdb;
