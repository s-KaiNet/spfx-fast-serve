import chalk from 'chalk';
import * as fs from 'fs';
import * as path from 'path';
import { FastServeFolderName } from '../common/consts';
import { logger } from '../common/Logger';
import { getTemplatesPath } from '../common/utils';
import { BaseCommand } from './BaseCommand';

export class CreateWebPackFile extends BaseCommand {
  public execute(): void {
    const webpackContent = fs.readFileSync(getTemplatesPath('webpack.js')).toString();
    fs.writeFileSync(path.join(process.cwd(), FastServeFolderName, 'webpack.js'), webpackContent);

    logger.success(chalk.blueBright('Created webpack.js file.'));
    logger.newLine();
  }
}
