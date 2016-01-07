var request = require('request');
var url = require('url');
var config = require('../config/config');

var BibleAPI = {};

module.exports = BibleAPI;


/*
// get bibles
/api/bibles

// get and create books
/api/bibles/en-asv/books

// get chapters
/api/bibles/eng-asv/books/John/chapters
/api/bibles/eng-asv/books/John/chapters/2

// checkouts
/api/bibles/eng-asv/books/John/chapters/2/checkout
checkout = true

// check in

checkout = false



*/


/**
 * Builds a url based on the given path.
 *
 * @param {string} path
 */

BibleAPI.buildUrl = function(path) {
  if (typeof path == 'string'){
    return url.resolve( config.bible_api_host, path );
  } else {
    return new Error("Path must be a string");
  }
};


/**
 * Get a list of all the bibles
 *
 * @param {string} token  // auth token
 * @param {function} callback  // callback function
 */

BibleAPI.getBibles = function(token, callback) {
  var options = {
    url: BibleAPI.buildUrl('/api/bibles'),
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Token token=' + token
    }
  };

  request.get(options, function(err, res, body) {
    return callback(err, res);
  });
};

/**
 * Get a list of all books of a bible
 *
 * @param {string} token  // auth token
 * @param {function} callback  // callback function
 */

BibleAPI.getBooks = function(token, bibleId, callback) {
  var options = {
    url: BibleAPI.buildUrl('/api/bibles/' + bibleId + '/books'),
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Token token=' + token
    }
  };
  request.get(options, function(err, res, body) {
    return callback(err, res);
  });
};



BibleAPI.createBible = function(token, bible_Id, bible_langcode, bible_version, bible_url, callback) {
  
  var options = {
    url: BibleAPI.buildUrl('/api/bibles'),
    headers : {
      'Accept': 'application/json',
      'Authorization': 'Token token=' + token
    },
    form: {'bibleId': bible_Id, 'version': bible_version, 'langCode': bible_langcode, 'bibleUrl': bible_url}
    };
    request.post(options, function(err, res, body) {
      console.log(res.body);
      return callback(err, res);
    });
  
};


BibleAPI.getTranslations = function(token, bibleId, callback) {
    var options = {
	url: BibleAPI.buildUrl('/api/bibles/' + bibleId + '/translations'),
	headers : {
	    'Accept': 'application/json',
	    'Authorization': 'Token token=' + token
	}
    };
    request.get(options, function(err, res, body) {
	return callback(err, res);
    });
};

BibleAPI.getChapters = function(token, bibleId, bookId, callback) {
    var options = {
	url: BibleAPI.buildUrl('/api/bibles/' + bibleId + '/books/' + bookId + '/chapters'),
	headers : {
	    'Accept': 'application/json',
	    'Authorization': 'Token token=' + token
	}
    };
    request.get(options, function(err, res, body) {
	return callback(err, res);
    });
}

BibleAPI.exportFile = function(token, bibleId, bookId, chapterId, transBibleId, callback) {
    BibleAPI.getTranslations(token, bibleId, function(err, transRes) {
	console.log('transRes is '+transRes.body);
	processedRes = JSON.parse(transRes.body);
	processedRes.forEach(function(item) {
	    if(item.bibleId == transBibleId) {
		console.log(item.langCode);
		var options = {
		    url: BibleAPI.buildUrl('/api/bibles/' + bibleId + '/books/' + bookId + '/chapters/' + chapterId + '/xlsx/' + item.langCode),
		    headers : {
			'Accept': 'application/json',
			'Authorization': 'Token token=' + token
		    }
		};
		console.log('url is ' + options.url);
		request.get(options, function(err, res, body) {
		    console.log('status code is '+res.statusCode + ' and ' + res.body)
		    return callback(err, res);
		});
	    }
	});
    });

}
