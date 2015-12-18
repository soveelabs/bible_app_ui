//
// Models
//
//

var config = require('../config/config');

var models = [];

exports = module.exports = function(app) {
  models.forEach(function (filename) {
    model= require(config.root + '/models/' + filename + '.js');
    app.use(model);
  });
};
