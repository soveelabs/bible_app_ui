//
// Middleware
//
var config = require('../config/config');

var middlewareOrder = [
  'storeLanguages'
]

exports = module.exports = function(app) {
  middlewareOrder.forEach(function (filename) {
    mw = require(config.root + '/middleware/' + filename + '.js');
    app.use(mw);
  });
};
