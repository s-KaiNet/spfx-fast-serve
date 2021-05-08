import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';
import replace from 'replace-in-file';

import { logger } from '../common/Logger';
import { BaseCommand } from './BaseCommand';
import { getTemplatesPath } from '../common/utils';

export class PatchGulpFile extends BaseCommand {
  public execute(): void {
    const gulpfilePath = path.join(process.cwd(), 'gulpfile.js');
    const currentGulpFile = fs.readFileSync(gulpfilePath).toString();

    if (currentGulpFile.indexOf('@microsoft/sp-webpart-workbench/lib/api') !== -1) {
      logger.success(chalk.blueBright('It looks like your gulpfile.js was patched before, skipping.'));
      logger.newLine();
      return;
    }

    if (currentGulpFile.indexOf('spfx-fast-serve-helpers') !== -1) {
      logger.success(chalk.blueBright('It looks like your gulpfile.js was patched before, skipping.'));
      logger.newLine();
      return;
    }

    const replaceContent = fs.readFileSync(getTemplatesPath('gulpfile.js')).toString();

    const options = {
      files: gulpfilePath,
      from: /build\.initialize.*;/g,
      to: replaceContent,
    };

    replace.sync(options);

    logger.success(chalk.blueBright('Patched gulpfile.js.'));
    logger.newLine();
  }
}
