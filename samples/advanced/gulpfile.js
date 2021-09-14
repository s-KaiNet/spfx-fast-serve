'use strict';

const build = require('@microsoft/sp-build-web');
const eslint = require('gulp-eslint7');

build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

const path = require('path');

build.tslintCmd.enabled = false;

build.configureWebpack.mergeConfig({
  additionalConfiguration: (generatedConfiguration) => {
    if (!generatedConfiguration.resolve.alias) {
      generatedConfiguration.resolve.alias = {};
    }

    //root src folder
    generatedConfiguration.resolve.alias['@src'] = path.resolve(__dirname, 'lib')

    return generatedConfiguration;
  }
});

var getTasks = build.rig.getTasks;
build.rig.getTasks = function () {
  var result = getTasks.call(build.rig);

  result.set('serve', result.get('serve-deprecated'));

  return result;
};

const eslintSubTask = build.subTask('eslint', function (gulp) {
  return gulp.src(['src/**/*.{ts,tsx}'])
    // eslint() attaches the lint output to the "eslint" property
    // of the file object so it can be used by other modules.
    .pipe(eslint())
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format())
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failAfterError last.
    .pipe(eslint.failAfterError());
});

build.rig.addPreBuildTask(eslintSubTask);

/* fast-serve */
const { addFastServe } = require("spfx-fast-serve-helpers");
addFastServe(build);
/* end of fast-serve */

build.initialize(require('gulp'));
