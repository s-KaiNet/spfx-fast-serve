import { readFile } from 'fs/promises';
import * as path from 'path';
import chalk from 'chalk';
import replace, { ReplaceInFileConfig } from 'replace-in-file';

import { logger } from '../common/Logger';
import { BaseCommand } from './BaseCommand';
import { getTemplatesPath } from '../common/utils';

export class PatchGulpFile extends BaseCommand {
  public async execute(): Promise<void> {
    const gulpfilePath = path.join(process.cwd(), 'gulpfile.js');
    const currentGulpFile = (await readFile(gulpfilePath)).toString();

    if (currentGulpFile.indexOf('spfx-fast-serve-helpers') !== -1) {
      logger.success(chalk.blueBright('It looks like your gulpfile.js was patched before, skipping.'));
      logger.newLine();
      return;
    }

    if (currentGulpFile.indexOf('build.configureWebpack.mergeConfig') !== -1) {
      logger.warning(chalk.yellowBright('We detected that you use webpack\'s task \'mergeConfig\' feature in your gulpfile.js. Make sure that you applied corresponding changes in webpack.extend.js as well.'));
      logger.newLine();
      logger.log(chalk.yellowBright('Please read https://github.com/s-KaiNet/spfx-fast-serve#webpack-extensibility for details.'));
      logger.newLine();
    }

    const replaceContent = (await readFile(getTemplatesPath('gulpfile.js'))).toString();

    const options: ReplaceInFileConfig = {
      files: gulpfilePath,
      from: /build\.initialize.*;/g,
      to: replaceContent,
      glob: {
        windowsPathsNoEscape: true
      }
    };

    await replace(options);

    logger.success(chalk.blueBright('Patched gulpfile.js.'));
    logger.newLine();
  }
}
