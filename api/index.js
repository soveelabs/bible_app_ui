//
// API routes
//

var config = require('../config/config');

// Specify controllers and the version that you wish to use
var controllers = [
  {name: 'translations', version: '1.0'},
  {name: 'languages', version: '1.0'},
  {name: 'bibles', version: '1.0'},
  {name: 'health', version: '1.0'}   
];

exports = module.exports = function(app) {
  controllers.forEach(function(c) {
    controller = require(config.root + '/api/' + c.version  + '/routes/' + c.name + '.js');
    app.use('/api/' + c.version + '/' + c.name, controller);
  });
};
