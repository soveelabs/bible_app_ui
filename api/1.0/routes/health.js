'use strict';

var express = require('express'),
    router = module.exports = express.Router();

router.get('/', function(req, res, next) {
  return res.status(200).end();
});

