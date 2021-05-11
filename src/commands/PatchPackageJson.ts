import * as fs from 'fs';
import chalk from 'chalk';
import * as path from 'path';
import detectIndent from 'detect-indent';

import { logger } from '../common/Logger';
import { getSpfxMinorVersion } from '../common/utils';
import { Settings } from '../interfaces/settings';
import { BaseCommand } from './BaseCommand';

export class PatchPackageJson extends BaseCommand {
  public execute({ cli: { isLibraryComponent } }: Settings): void {
    const packagePath = path.join(process.cwd(), 'package.json');
    const packageString = fs.readFileSync(packagePath).toString();
    const indent = detectIndent(packageString).indent || '  ';
    const packageJson = JSON.parse(packageString);
    const minorVersion = getSpfxMinorVersion();

    const templateDeps: Record<string, string> = {};

    if (minorVersion >= 4 && minorVersion < 9) {
      templateDeps['spfx-fast-serve-helpers'] = '~1.4.0';
    } else if (minorVersion >= 9 && minorVersion < 12) {
      templateDeps['spfx-fast-serve-helpers'] = '~1.11.0';
    } else if (minorVersion >= 12) {
      templateDeps['spfx-fast-serve-helpers'] = `~1.${minorVersion}.0`;
    } else {
      throw new Error(`Unsupported SPFx version: 1.${minorVersion}`)
    }

    if (isLibraryComponent) {
      templateDeps['concurrently'] = '5.3.0';
    }

    for (const dependency in templateDeps) {
      const version = templateDeps[dependency];
      if (packageJson.devDependencies[dependency] && packageJson.devDependencies[dependency] !== version) {
        logger.warning(chalk.yellowBright('Your dependency \'' + dependency + '\' version \'' + packageJson.devDependencies[dependency] + '\' will be replaced with version \'' + version + '\''));
      }

      packageJson.devDependencies[dependency] = version;
    }

    packageJson.scripts = packageJson.scripts || {};
    if (packageJson.scripts['serve']) {
      logger.warning(chalk.yellowBright('Your npm \'serve\' command will be replaced.'));
      logger.newLine();
    }

    if (isLibraryComponent) {
      packageJson.scripts['serve'] = 'gulp bundle --custom-serve --max_old_space_size=4096 && concurrently "fast-serve" "npm run ts"';
      packageJson.scripts['ts'] = 'tsc -p tsconfig.json -w --preserveWatchOutput';
    } else {
      packageJson.scripts['serve'] = 'gulp bundle --custom-serve --max_old_space_size=4096 && fast-serve';
    }

    fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, indent));

    logger.success(chalk.blueBright('Updated package.json.'));
    logger.newLine();
  }
}
