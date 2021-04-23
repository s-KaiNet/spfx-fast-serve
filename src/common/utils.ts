import * as path from 'path';
import { WebpackExtendFileName } from './consts';
const packagePath = path.join(process.cwd(), 'package.json');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require(packagePath);

export function getTemplatesPath(fileName: string) {
  const minorVersion = getSpfxMinorVersion();
  let basePath = 'templates/';

  if (fileName === WebpackExtendFileName) {
    basePath += 'common/';
  } else if (minorVersion >= 12) {
    basePath += 'latest/';
  } else if (minorVersion >= 9 && minorVersion < 12) {
    basePath += '1.11/';
  } else if (minorVersion > 4 && minorVersion < 9) {
    basePath += '1.7.1/';
  } else if (minorVersion === 4) {
    basePath += '1.4.1/';
  } else {
    throw new Error(`SharePoint Framework with minor version ${minorVersion} is not supported.`);
  }

  return path.join(__dirname, '..', basePath + fileName);
}

export function getSpfxMinorVersion() {
  const dependecyToCheck = '@microsoft/sp-build-web';
  let version: string = packageJson.devDependencies[dependecyToCheck];
  if (version.indexOf('~') === 0 || version.indexOf('^') === 0) {
    version = version.substr(1);
  }
  return parseInt(version.split('.')[1]);
}
