const path = require('path');

module.exports = function (webpackConfiguration) {
  if (!webpackConfiguration.resolve.alias) {
    webpackConfiguration.resolve.alias = {};
  }

  // root src folder
  webpackConfiguration.resolve.alias['@src'] = path.resolve(__dirname, '../../lib');

  return webpackConfiguration;
};
