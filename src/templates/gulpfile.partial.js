const argv = build.rig.getYargs().argv;
const useCustomServe = argv['custom-serve'];
const fs = require("fs");
const workbenchApi = require("@microsoft/sp-webpart-workbench/lib/api");

if (useCustomServe) {
  const ensureWorkbenchSubtask = build.subTask('ensure-workbench-task', function (gulp, buildOptions, done) {
    this.log('Creating workbench.html file...');
    try {
      workbenchApi.default["/workbench"]();
    } catch (e) { }

    done();
  });

  build.rig.addPostBundleTask(build.task('ensure-workbench', ensureWorkbenchSubtask));
}

build.initialize(require('gulp'));
