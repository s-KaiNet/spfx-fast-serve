import * as path from 'path';
const packagePath = path.join(process.cwd(), 'package.json');
const dependecyToCheck = '@microsoft/sp-build-web';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require(packagePath);

export function getTemplatesPath(fileName: string) {
  const basePath = 'templates/';

  return path.join(__dirname, '..', basePath + fileName);
}

export function getSpfxMinorVersion() {
  let version: string = packageJson.devDependencies[dependecyToCheck];
  if (version.indexOf('~') === 0 || version.indexOf('^') === 0) {
    version = version.substr(1);
  }
  return parseInt(version.split('.')[1]);
}

export function isBeta() {
  const version: string = packageJson.devDependencies[dependecyToCheck];

  return version.indexOf('-beta') !== -1;
}
