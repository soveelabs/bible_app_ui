var newrelic = require('newrelic'),
    express = require('express'),
    app = express();

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
