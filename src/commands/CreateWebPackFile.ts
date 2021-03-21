import * as chalk from 'chalk';
import * as fs from 'fs';
import * as path from 'path';
import { logger } from '../common/Logger';
import { getTemplatesPath } from '../common/utils';
import { BaseCommand } from './BaseCommand';

export class CreateWebPackFile extends BaseCommand {
  public execute(): void {
    const webpackContent = fs.readFileSync(getTemplatesPath('webpack.ejs')).toString();
    fs.writeFileSync(path.join(process.cwd(), 'webpack.js'), webpackContent);

    logger.success(chalk.blueBright('Created webpack.js file.'));
    logger.newLine();
  }
}
