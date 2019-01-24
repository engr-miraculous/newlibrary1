const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:adminRoutes');

const authRouter = express.Router();

function router(nav) {
  authRouter.route('/signup').post((req, res) => {
    res.json(req.body);
  });
  return authRouter;
}

module.exports = router;
