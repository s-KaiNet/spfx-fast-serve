import * as fs from 'fs';
import chalk from 'chalk';
import * as path from 'path';
import detectIndent from 'detect-indent';

import { logger } from '../common/Logger';
import { getSpfxMinorVersion, getTemplatesPath } from '../common/utils';
import { Settings } from '../interfaces/settings';
import { BaseCommand } from './BaseCommand';
import { FastServeFolderName } from '../common/consts';

export class PatchPackageJson extends BaseCommand {
  public execute({ cli: { isLibraryComponent, usePnpm, useRestProxy } }: Settings): void {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const templateDeps = require(getTemplatesPath('dependecies.json'));
    const packagePath = path.join(process.cwd(), 'package.json');
    const packageString = fs.readFileSync(packagePath).toString();
    const indent = detectIndent(packageString).indent || '  ';
    const packageJson = JSON.parse(packageString);
    const minorVersion = getSpfxMinorVersion();

    if (isLibraryComponent) {
      templateDeps['concurrently'] = '5.3.0';
    }

    if (useRestProxy) {
      templateDeps['sp-rest-proxy'] = '3.0.2';
    }

    if (usePnpm) {
      templateDeps['@microsoft/loader-load-themed-styles'] = '1.7.191';
      templateDeps['@microsoft/loader-cased-file'] = '1.10.0';
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
    }



    if (isLibraryComponent) {
      packageJson.scripts['serve'] = `cross-env NODE_OPTIONS=--max_old_space_size=4096 gulp bundle --custom-serve && cross-env NODE_OPTIONS=--max_old_space_size=4096 concurrently "webpack-dev-server --mode development --config ./${FastServeFolderName}/webpack.js --env.env=dev" "npm run ts"`;
      packageJson.scripts['ts'] = 'tsc -p tsconfig.json -w --preserveWatchOutput';

      if (minorVersion >= 12) {
        packageJson.scripts['serve'] = `cross-env NODE_OPTIONS=--max_old_space_size=4096 gulp bundle --custom-serve && cross-env NODE_OPTIONS=--max_old_space_size=4096 concurrently "webpack serve --mode development --config ./${FastServeFolderName}/webpack.js --env dev" "npm run ts"`;
       }

    } else {
      packageJson.scripts['serve'] = `cross-env NODE_OPTIONS=--max_old_space_size=4096 gulp bundle --custom-serve && cross-env NODE_OPTIONS=--max_old_space_size=4096 webpack-dev-server --mode development --config ./${FastServeFolderName}/webpack.js --env.env=dev`;

      if (minorVersion >= 12) {
        packageJson.scripts['serve'] = `cross-env NODE_OPTIONS=--max_old_space_size=4096 gulp bundle --custom-serve && cross-env NODE_OPTIONS=--max_old_space_size=4096 webpack serve --mode development --config ./${FastServeFolderName}/webpack.js --env dev`;
      }
    }

    fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, indent));

    logger.success(chalk.blueBright('Updated package.json.'));
    logger.newLine();
  }
}
