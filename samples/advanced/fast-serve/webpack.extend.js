/*
* User webpack settings file. You can add your own settings here.
* Changes from this file will be merged into the base webpack configuration file.
* This file will not be overwritten by the subsequent spfx-fast-serve calls.
*/

const path = require("path");

// you can add your project related webpack configuration here, it will be merged using webpack-merge module
// i.e. plugins: [new webpack.Plugin()]
const webpackConfig = {
  resolve: {
    alias: {
      "@src": path.resolve(__dirname, "..", "src")
    }
  },
  // module: {
  //   rules: [{
  //     test: /\.js$/,
  //     include: [
  //       /lit/,
  //       /@lit/,
  //       /lit-html/
  //     ],
  //     use: {
  //       loader: 'babel-loader',
  //       options: {
  //         plugins: [
  //           '@babel/plugin-transform-optional-chaining',
  //           '@babel/plugin-transform-nullish-coalescing-operator',
  //           '@babel/plugin-transform-logical-assignment-operators'
  //         ]
  //       }
  //     }
  //   }]
  // }
}

// for even more fine-grained control, you can apply custom webpack settings using below function
const transformConfig = function (initialWebpackConfig) {
  // transform the initial webpack config here, i.e.
  // initialWebpackConfig.plugins.push(new webpack.Plugin()); etc.

  return initialWebpackConfig;
}

module.exports = {
  webpackConfig,
  transformConfig
}
