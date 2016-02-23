var express = require('express'),
    app = express();
//var newrelic = require('newrelic');

// require default initializer
require('./initialize/setup')(app);

// START of router block
//
//
// Place all app routers between here
//
//
// END of router block

// require errors should go last
require('./initialize/errors')(app);

exports = module.exports = app;
