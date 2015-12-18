var express = require('express'),
    config = require('../../../config/config'),
    request = require('request'),
    Auth = require('../../../lib/auth'),
    router = express.Router();

var routes = {
  index: function(req, res, next) {
    var q = req.query;

    Auth.findLanguagesByCustomer(q.customer, req.auth.user, function(err, languageCodes) {
      if (err) { return res.status(500).json({error: err}); }

      Auth.convertLanguageCodes(languageCodes, req.languages, function(err, languages) {
        if (err) { return res.status(500).json({error: err}); }

        return res.json(languages);
      });
    });

  },

  detect: function(req, res, next) {
    var q = req.query;

    var options = {
      url: config.detect_language_host + '/0.2/detect',
      qs: {key: config.detect_language_key, q: q.text},
      headers: {'Accept': 'application/json'}
    };

    request.get(options, function(err, response, body) {
      if (err) { return res.status(500).json({error: err}); }

      var detected_languages = JSON.parse(body).data.detections,
          codes = detected_languages.map(function(lang){ return lang.language; });

      Auth.convertLanguageCodes(codes, req.languages, function(err, languages) {
        if (err) { return res.status(500).json({error: err}); }

        languages.map(function(lang, index) {
          languages[index].confidence = detected_languages[index].confidence;
        });

        return res.status(res.statusCode).json(languages);
      });

    });
  }
};

router.get('/', routes.index);

router.get('/detect', routes.detect);

exports = module.exports = router;
