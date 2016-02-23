var express = require('express'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    compress = require('compression'),
    methodOverride = require('method-override'),
    config = require('../config/config'),
    session = require('express-session'),
    expstate = require('express-state');
//    health = require('node-health');

function setup(app) {
  // setup directory where views are localed
  app.set('views', config.root + '/views');

  // setup engine for views
  app.set('view engine', 'ejs');

  // setup enviroment variables
  require('../config/environment')(app);

  // setup sessions
  require('../initialize/sessions')(app);

  app.use(favicon(config.root + '/public/favicon.ico'));

  // Use morgan logger
  app.use(logger('dev'));

  // Use body parser
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  // health
//  app.use(health);

  // Auth
/*  mw = auth({
    auth: {
      host: config.auth_url
    }
  });
  app.use('/api', mw.api);
  app.use(/^\/(?!api(\/|$)).*$/, mw.app);
  app.use(mw.routes);
*/
  // Compress all requests
  app.use(compress());

  // Use public directory for static files
  app.use(express.static(config.root + '/public'));

  // Method override
  app.use(methodOverride());

  // Use express state to extend exposed state data
  expstate.extend(app);

  // Require middleware 
  // /middleware/index.js contains a list of all middleware 
  // This will include all middleware found in the index.js file
  require(config.root + '/middleware/index.js')(app);

  // Require models
  // /app/models/index.js contains a list of all models
  // This will include all models found in the index.js file
  require(config.root + '/models/index.js')(app);

  // Require controllers
  // /app/controllers/index.js contains a list of all controllers
  // This will include all controllers found in the index.js file
  require(config.root + '/api/index.js')(app);

  // listen to port
  app.listen(config.port);
}

exports = module.exports = setup; 
