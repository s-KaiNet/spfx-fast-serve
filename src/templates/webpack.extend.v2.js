/*
* User webpack settings file. You can add your own settings here.
* Changes from this file will be merged into the base webpack configuration file.
* This file will not be overwritten by the subsequent spfx-fast-serve calls.
*/

/**
 * you can add your project related webpack configuration here, it will be merged using webpack-merge module
 * i.e. plugins: [new webpack.Plugin()]
 */
const webpackConfig = {

}

/**
 * For even more fine-grained control, you can apply custom webpack settings using below function
 * @param {object} initialWebpackConfig - initial webpack config object
 * @param {object} webpack - webpack object, used by SPFx pipeline
 * @returns webpack config object
 */
const transformConfig = function (initialWebpackConfig, webpack) {
  // transform the initial webpack config here, i.e.
  // initialWebpackConfig.plugins.push(new webpack.Plugin()); etc.

  return initialWebpackConfig;
}

module.exports = {
  webpackConfig,
  transformConfig
}
