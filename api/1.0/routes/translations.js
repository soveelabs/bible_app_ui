var express = require('express'),
    config = require('../../../config/config'),
    Alchemy = require('../../../lib/alchemy'),
    router = express.Router();

var routes = {
  text: function(req, res, next) {
    var q = req.query;

    Alchemy.translate.text(q.text, q.from, q.to, q.customer, req.auth.token, function(err, alchemy_res) {
      if (err) { return res.status(500).json({error: err}); }

      if(alchemy_res.statusCode == 200) {
        return res.json(alchemy_res.body);
      } else {
        return res.status(alchemy_res.statusCode).json(alchemy_res.body);
      }
    });
  },

  html: function(req, res, next) {
    var q = req.query;

    Alchemy.translate.htmlFragment(q.html, q.from, q.to, q.customer, req.auth.token, function(err, alchemyResponse) {
      if (err) { return res.status(500).json({error: err}); }

      if(alchemyResponse.statusCode == 200) {
        return res.json(alchemyResponse.body);
      } else {
        return res.status(alchemyResponse.statusCode).json(alchemyResponse.body);
      }
    });
  },
};

router.get('/text', routes.text);

router.get('/html', routes.html);

exports = module.exports = router;
