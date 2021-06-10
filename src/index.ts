#!/usr/bin/env node

import chalk from 'chalk';

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

const message = 'Now you should run \'npm install\'. When you\'re done, simply execute \'npm run serve\'';

logger.warning(chalk.bgRed(message));
