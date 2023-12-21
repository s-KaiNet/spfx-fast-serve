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
  logger.warning(chalk.yellowBright(`Your SPFx version 1.${minorVersion} is not supported. For SPFx < 1.17 use spfx-fast-serve@3.x. More info https://github.com/s-KaiNet/spfx-fast-serve#which-sharepoint-framework-versions-are-supported`));
  process.exit(1);
}

const pipeline = new Pipeline(
  new PatchGulpFile(),
  new PatchPackageJson(),
  new Install());

(async () => {
  await pipeline.execute();
})();
