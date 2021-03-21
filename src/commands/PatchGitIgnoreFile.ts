import * as fs from 'fs';
import chalk from 'chalk';
import * as path from 'path';

import { BaseCommand } from './BaseCommand';
import { logger } from '../common/Logger';

export class PatchGitIgnoreFile extends BaseCommand {
  public execute(): void {
    const gitIgnorePath = path.join(process.cwd(), '.gitignore');
    const lineToAdd = '*.scss.d.ts';

    if (!fs.existsSync(gitIgnorePath)) {
      logger.warning(chalk.yellowBright('.gitignore file is not found under ' + gitIgnorePath + '. Skipping the step.'));
      logger.warning(chalk.yellowBright('Manually add \'' + lineToAdd + '\' to your .gitignore'));
      logger.newLine();
      return;
    }
    const gitIgnorePathFile = fs.readFileSync(gitIgnorePath).toString();

    if (gitIgnorePathFile.indexOf(lineToAdd) !== -1) {
      logger.success(chalk.blueBright('It looks like .gitignore was patched before, skipping.'));
      logger.newLine();
      return;
    }

    fs.appendFileSync(gitIgnorePath, lineToAdd);

    logger.success(chalk.blueBright('Updated .gitignore.'));
    logger.newLine();
  }

}
