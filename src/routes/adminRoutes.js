const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:adminRoutes');

const adminRouter = express.Router();

function router(nav) {
  adminRouter.route('/').get((req, res) => {
    const url = 'mongodb://localhost:27017';
    const dbName = 'libraryApp';
    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('conected to mongodb');
        const db = await client.db(dbName);
        const Response = await db.collection('books').insertMany(books);
        res.json(Response);
      } catch (err) {
        debug(err.stack);
      }
      client.close();
    }());
  });
  return adminRouter;
}

module.exports = router;
