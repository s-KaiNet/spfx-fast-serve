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
import { getSpfxMinorVersion } from './common/utils';

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

const spfxVersion = getSpfxMinorVersion();
let message = 'Now you should run \'npm install\'. When you\'re done, simply execute \'npm run serve\'';
if (spfxVersion >= 12) {
  message = message + ' or \'gulp serve --fast\'';
}

logger.warning(chalk.bgRed(message));
