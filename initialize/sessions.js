var express = require('express'),
    session = require('express-session'),
    redisStore = require('connect-redis')(session),
    config = require('../config/config');

function sessions(app) {

  var options = {
    host: config.redis_host,
    port: config.redis_port
  }

  var sess = {
    store: new redisStore(options),
    secret: '217953a1c9a970d8dafa18311481b2e4154efd2825359bafb4f0c716833087c928ce76407bee491d8dde4a0fa08c3cd521c99f9962f2c236e3ee769a50edd3e9',
    cookie: {maxAge: 7 * 24 * 60 * 60 * 1000},
    resave: true,
    saveUninitialized: true
  }

  var env = app.get('env');
  if (env === 'production' || env === 'staging') {
    app.set('trust proxy', 1);
  }

  app.use(session(sess));

};

exports = module.exports = sessions
