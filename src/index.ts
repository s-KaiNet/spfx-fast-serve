#!/usr/bin/env node

import updateNotifier from 'update-notifier';
import chalk from 'chalk';
import {
  PatchGulpFile,
  PatchPackageJson,
  Pipeline,
  Install
} from './commands';
import { getSpfxMinorVersion } from './common/utils';
import { logger } from './common/Logger';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require('./../package.json');

updateNotifier({ pkg }).notify();

const minorVersion = getSpfxMinorVersion();

if (minorVersion < 17) {
  logger.warning(chalk.yellowBright(`Your SPFx version 1.${minorVersion} is not supported. Please use SPFx 1.17.0 or higher.`));
  process.exit(1);
}

const pipeline = new Pipeline(
  new PatchGulpFile(),
  new PatchPackageJson(),
  new Install());

(async () => {
  await pipeline.execute();
})();
