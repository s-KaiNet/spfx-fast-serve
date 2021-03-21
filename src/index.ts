#!/usr/bin/env node

import * as chalk from 'chalk';

import { logger } from './common/Logger';
import { CreateWebPackFile, PatchGitIgnoreFile, PatchGulpFile, PatchPackageJson, Pipeline } from './commands';

const pipeline = new Pipeline(
  new CreateWebPackFile(),
  new PatchGulpFile(),
  new PatchPackageJson(),
  new PatchGitIgnoreFile());

logger.newLine();

pipeline.execute();

logger.success(chalk.green('All done!'));
logger.newLine();

logger.warning(chalk.bgRed('Now you should run \'npm install\'. When you\'re done, simply execute \'npm run serve\''));
