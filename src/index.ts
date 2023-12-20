#!/usr/bin/env node

import updateNotifier from 'update-notifier';

import {
  PatchGulpFile,
  PatchPackageJson,
  Pipeline,
  Install
} from './commands';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require('./../package.json');

updateNotifier({ pkg }).notify();

const pipeline = new Pipeline(
  new PatchGulpFile(),
  new PatchPackageJson(),
  new Install());

(async () => {
  await pipeline.execute();
})();
