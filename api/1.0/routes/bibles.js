var express = require('express'),
    config = require('../../../config/config'),
    request = require('request'),
    BibleAPI = require('../../../lib/bible-api'),
    router = express.Router();

//https://staging-bible-api.sovee.com/

var routes = {
  index: function(req, res, next) {

    BibleAPI.getBibles(config.auth_token, function(err, bible_res) {
      if (err) { return res.status(500).json({error: err}); }

      if (bible_res.statusCode == 200) {
        return res.json(bible_res);
      } else {
        return res.status(bible_res.statusCode).json(bible_res.body);
      }
    });
  }//,
//  books: function (req, res, next) {
//    var q = req.query;
//  }
};


router.get('/', routes.index);
//router.get('/:bible_id', routes.index);
//router.get('/books', routes.books);
//router.get('/chapters', routes.chapters);
//router.get('/detect', routes.detect);

exports = module.exports = router;
