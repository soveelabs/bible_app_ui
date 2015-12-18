var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env;

var config = {
  root: rootPath,
  app: {
    name: 'offline-bible-app-ui'
  },
  port: env.PORT || 3000,
  auth_host: env.AUTH_HOST,
  auth_url: env.AUTH_URL,
  auth_token: env.AUTH_TOKEN,
  alchemy_host: env.ALCHEMY_HOST,
  redis_host: env.REDIS_HOST,
  redis_port: env.REDIS_PORT,
  google_api_host: env.GOOGLE_API,
  google_key: env.GOOGLE_KEY,
  se_host: env.SE_HOST,
  bible_api_host: env.BIBLE_API,
  detect_language_host: env.DETECT_LANGUAGE_HOST,
  detect_language_key: env.DETECT_LANGUAGE_KEY
};

module.exports = config;
