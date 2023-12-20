import { readFile, writeFile } from 'fs/promises';
import chalk from 'chalk';
import * as path from 'path';
import detectIndent from 'detect-indent';

import { logger } from '../common/Logger';
import { getSpfxMinorVersion, isBeta } from '../common/utils';
import { BaseCommand } from './BaseCommand';

export class PatchPackageJson extends BaseCommand {
  public async execute(): Promise<void> {
    const packagePath = path.join(process.cwd(), 'package.json');
    const packageString = (await readFile(packagePath)).toString();
    const indent = detectIndent(packageString).indent || '  ';
    const packageJson = JSON.parse(packageString);
    const minorVersion = getSpfxMinorVersion();

    let version = `~1.${minorVersion}.0`;
    const dependency = 'spfx-fast-serve-helpers';

    if (isBeta()) {
      version = `${version}-beta.0`;
    }

    if (packageJson.devDependencies[dependency] && packageJson.devDependencies[dependency] !== version) {
      logger.warning(chalk.yellowBright('Your dependency \'' + dependency + '\' version \'' + packageJson.devDependencies[dependency] + '\' will be replaced with version \'' + version + '\''));
    }

    packageJson.devDependencies[dependency] = version;

    packageJson.scripts = packageJson.scripts || {};
    if (packageJson.scripts['serve']) {
      logger.warning(chalk.yellowBright('Your npm \'serve\' command will be replaced.'));
      logger.newLine();
    }

    packageJson.scripts['serve'] = 'fast-serve';

    await writeFile(packagePath, JSON.stringify(packageJson, null, indent));

    logger.success(chalk.blueBright('Updated package.json.'));
    logger.newLine();
  }
}
