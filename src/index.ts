#!/usr/bin/env node

import chalk from 'chalk';
import updateNotifier from 'update-notifier';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require('./../package.json');

updateNotifier({pkg}).notify();

import { logger } from './common/Logger';
import {
  PatchGitIgnoreFile,
  PatchGulpFile,
  PatchPackageJson,
  Pipeline,
  CreateWebPackExtendFile
} from './commands';
import { SettingsManager } from './common/SettingsManager';

const settings = SettingsManager.createSettings();

const pipeline = new Pipeline(
  settings,
  new CreateWebPackExtendFile(),
  new PatchGulpFile(),
  new PatchPackageJson(),
  new PatchGitIgnoreFile());

logger.newLine();

pipeline.execute();

logger.success(chalk.green('All done!'));
logger.newLine();

const message = 'Now restore dependecies (\'npm install\' for npm) and execute \'npm run serve\' afterwards.';

logger.info(chalk.bgMagenta.white(message));
