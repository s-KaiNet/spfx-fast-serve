import chalk from 'chalk';
import * as fs from 'fs';
import * as path from 'path';
import { FastServeFolderName } from '../common/consts';
import { logger } from '../common/Logger';
import { getTemplatesPath } from '../common/utils';

import { BaseCommand } from './BaseCommand';

export class CreateWebPackExtendFile extends BaseCommand {
  public execute(): void {
    const filename = 'webpack.extend.js';
    const filePath = path.join(process.cwd(), FastServeFolderName, filename);
    const webpackContent = fs.readFileSync(getTemplatesPath(filename)).toString();

    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, webpackContent);
      logger.success(chalk.blueBright('Created webpack.extend.js file.'));
      logger.newLine();
    }
  }
}
