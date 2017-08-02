let path = require('path');
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

module.exports = app => {
  app.use('/', router);
};

router.get('/', (req, res, next) => {
  //TODO - move index into views
  res.sendFile(path.join( __dirname + '/index.html'));
});
