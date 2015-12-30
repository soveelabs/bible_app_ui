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
console.log(options);
  request.get(options, function(err, res, body) {
    return callback(err, res);
  });
};


/*
BibleAPI.createBible = function(lang_code, token, callback) {
  if( !lang_code ) { return callback(new Error('You must specify a language code'), null); }

  var options = {
    url: BibleAPI.buildUrl('books'),
    qs: {token: token},
    headers: {'Accept': 'application/json'}
  };

  request.get(options, function(err, res, body) {
    return callback(err, res);
  });
  
};
*/
