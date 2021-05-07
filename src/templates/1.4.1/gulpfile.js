/**
 *  fast-serve
 */

const useCustomServe = build.rig.getYargs().argv['custom-serve'];
const writeFileSync = require("fs").writeFileSync;
const workbenchApi = require("@microsoft/sp-webpart-workbench/lib/api");
const del = require('del');

if (useCustomServe) {
  const ensureWorkbenchSubtask = build.subTask('ensure-workbench-task', function (gulp, buildOptions, done) {
    this.log('Creating workbench.html file...');
    try {
      workbenchApi.default["/workbench"]();
    } catch (e) { }

    done();
  });

  const saveConfigTask = build.subTask('save-webpack-config', (gulp, config, done) => {
    const serveAdditionalConfig = (generatedConfiguration) => {
      writeFileSync("./temp/_webpack_config.json", JSON.stringify(generatedConfiguration, null, 2));
      return generatedConfiguration;
    }

    if (!build.configureWebpack.taskConfig.additionalConfiguration) {
      build.configureWebpack.mergeConfig({
        additionalConfiguration: serveAdditionalConfig
      });
    } else {
      const oldConfigFunc = build.configureWebpack.taskConfig.additionalConfiguration;
      build.configureWebpack.mergeConfig({
        additionalConfiguration: (generatedConfiguration) => {
          generatedConfiguration = oldConfigFunc(generatedConfiguration);

          return serveAdditionalConfig(generatedConfiguration);
        }
      });
    }

    done();
  });

  build.rig.addPostTypescriptTask(saveConfigTask);
  build.rig.addPostBuildTask(build.task('ensure-workbench', ensureWorkbenchSubtask));
}

const deleteDefinitions = build.subTask('delete-scss-definitions-task', function (gulp, buildOptions, done) {
  del.sync(['src/**/*.scss.d.ts']);

  done();
});

build.rig.addPreBuildTask(build.task('delete-scss-definitions', deleteDefinitions));

/**
 * End of fast-serve
 */

build.initialize(require('gulp'));
