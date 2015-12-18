/**
 * New Relic agent configuration.
 *
 * See lib/config.defaults.js in the agent distribution for a more complete
 * description of configuration variables and their potential values.
 */
var appName = 'offline-bible-app-ui';
if (process.env.NODE_ENV === 'staging') {
    appName = appName + ' (Staging)';
}

exports.config = {
  /**
   * Array of application names.
   */
  app_name: [appName],
  /**
   * Your New Relic license key.
   */
  license_key: '36af444b685f89ede7359ac5e6c928d6bfe8d5a8',
  logging: {
    /**
     * Level at which to log. 'trace' is most useful to New Relic when diagnosing
     * issues with the agent, 'info' and higher will impose the least overhead on
     * production applications.
     */
    level: 'info'
  },
  capture_params : true,
  ignored_params : ['token']
}
