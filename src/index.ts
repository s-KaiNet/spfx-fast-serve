#!/usr/bin/env node

import chalk from 'chalk';
import updateNotifier from 'update-notifier';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require('./../package.json');

updateNotifier({pkg}).notify();

import { logger } from './common/Logger';
import {
  PatchGulpFile,
  PatchPackageJson,
  Pipeline,
} from './commands';

const pipeline = new Pipeline(
  new PatchGulpFile(),
  new PatchPackageJson());

logger.newLine();

pipeline.execute();

logger.success(chalk.green('All done!'));
logger.newLine();

const message = 'Now restore dependencies (\'npm install\' for npm) and execute \'npm run serve\' afterwards.';

logger.info(chalk.bgMagenta.white(message));
