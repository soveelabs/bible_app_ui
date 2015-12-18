var express = require('express'),
    request = require('request'),
    Auth = require('../lib/auth'),
    router = express.Router();

function storeLanguages(req, res, next) {
  var options = {
    url: Auth.authUrl('/languages'),
    headers: { 'Accept': 'application/json' }
  };

  request.get(options, function(err, response, body) {
    var languages = JSON.parse(body);

    if ( response.statusCode == 200 ) {
      Auth.formatLanguageJson(languages, function(err, formattedLanguages) {
        req.languages = formattedLanguages;
        return next();
      });
    }
  });
};

router.use(storeLanguages);

exports = module.exports = router;
