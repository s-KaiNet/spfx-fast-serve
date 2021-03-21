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

    let hasErrors = false;

    let replaceContent;
    // if gulpfile.js contains call to build.configureWebpack.mergeConfig, we need manual merge
    if (currentGulpFile.indexOf('build.configureWebpack.mergeConfig') !== -1) {
      replaceContent = fs.readFileSync(getTemplatesPath('gulpfile.partial.js')).toString();

      logger.warning(chalk.redBright('You use webpack\'s task \'mergeConfig\' feature in your gulpfile.js. Manual merge required.'));
      logger.log(chalk.redBright('Please read https://github.com/s-KaiNet/spfx-fast-serve#manual-merge-warning for details.'));
      logger.newLine();
      hasErrors = true;
    } else {
      replaceContent = fs.readFileSync(getTemplatesPath('gulpfile.full.js')).toString();
    }

    const options = {
      files: gulpfilePath,
      from: /build\.initialize.*;/g,
      to: replaceContent,
    };

    replace.sync(options);

    if (!hasErrors) {
      logger.success(chalk.blueBright('Patched gulpfile.js.'));
    } else {
      logger.warning(chalk.blueBright('Patched gulpfile.js with warnings.'));
    }
    logger.newLine();
  }
}
