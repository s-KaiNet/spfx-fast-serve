const path = require('path');

module.exports = function (webpackConfiguration) {
  if (!webpackConfiguration.resolve.alias) {
    webpackConfiguration.resolve.alias = {};
  }

  // root src folder
  webpackConfiguration.resolve.alias['@src'] = path.resolve(__dirname, '../../lib');

  // mgt related loaders
  // webpackConfiguration.module.rules.push({
  //   test: /\.js$/,
  //   // only run on lit packages in the root node_module folder
  //   include: [
  //     /lit/,
  //     /@lit/,
  //     /lit-html/
  //   ],
  //   use: {
  //     loader: "babel-loader",
  //     options: {
  //       plugins: [
  //         "@babel/plugin-transform-optional-chaining",
  //         "@babel/plugin-transform-nullish-coalescing-operator",
  //         "@babel/plugin-transform-logical-assignment-operators"
  //       ]
  //     }
  //   }
  // });

  return webpackConfiguration;
};
