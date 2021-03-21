/*
* User webpack settings file. You can add your own settings here.
* Changes from this file will be merged into the base webpack configuration file.
* This file will not be overwritten by the subsequent spfx-fast-serve calls.
*/

const path = require("path");

module.exports = {
  resolve: {
    alias: {
      "@src": path.resolve(__dirname, "..", "src")
    }
  }
}
