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
        var processedRes = JSON.parse(bible_res.body);
        return res.json(processedRes);
      } else {
        return res.status(bible_res.statusCode).json(bible_res.body);
      }
    });
  },
  books: function (req, res, next) {
    var q = req.query;
    BibleAPI.getBooks(config.auth_token, q.bible_id, function(err, books_res) {
      if (err) { return res.status(500).json({error: err}); }

      if (books_res.statusCode == 200) {
        var processedRes = JSON.parse(books_res.body);
        return res.json(processedRes);
      } else {
        return res.status(books_res.statusCode).json(books_res.body);
      }
    });
  },
    translations: function(req, res, next) {
	var q = req.query;
	BibleAPI.getTranslations(config.auth_token, q.bible_id, function(err, translations_res) { 
	    if (err) { return res.status(500).json({error: err}); }
	    if (translations_res.statusCode == 200) {
		var processedRes = JSON.parse(translations_res.body)
		return res.json(processedRes);
	    } else {
		return res.status(translations_res.statusCode).json(translations_res.body);
	    }
	});
    },
    chapters: function(req, res, next) {
	var q = req.query;
	BibleAPI.getChapters(config.auth_token, q.bible_id, q.book_id, function(err, chapters_res) { 
	    if (err) { return res.status(500).json({error: err}); }
	    if (chapters_res.statusCode == 200) {
		var processedRes = JSON.parse(chapters_res.body)
		return res.json(processedRes);
	    } else {
		return res.status(chapters_res.statusCode).json(chapters_res.body);
	    }
	});
    },
    exports: function(req, res, next) {
	var q = req.query;
	BibleAPI.exportFile(config.auth_token, q.bible_id, q.book_id, q.chapter_id, q.trans_bible_id, function(err, export_res) { 
	    if (err) { return res.status(500).json({error: err}); }
	    if (export_res.statusCode == 200) {
		var processedRes = JSON.parse(export_res.body)
		return res.json(processedRes);
	    } else {
		return res.status(export_res.statusCode).json(export_res.body);
	    }
	});
    },
  
  import: function(req, res, next) {
  var q = req.query;
  BibleAPI.createBible(config.auth_token, q.bible_id, q.bible_langCode,q.bible_langCode,q.bible_url, function(err, import_res) { 
      if (err) { return res.status(500).json({error: err}); }
      if (import_res.statusCode == 200) {
    var processedRes = JSON.parse(import_res.body)
    return res.json(processedRes);
      } else {
    return res.status(import_res.statusCode).json(import_res.body);
      }
  });
    }
};


router.get('/', routes.index);
//router.get('/:bible_id', routes.index);
router.get('/books', routes.books);
//router.get('/chapters', routes.chapters);
router.get('/import', routes.import);
router.get('/translations', routes.translations);
router.get('/chapters', routes.chapters);
router.get('/export', routes.exports);

exports = module.exports = router;
