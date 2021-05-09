import * as path from 'path';
const packagePath = path.join(process.cwd(), 'package.json');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require(packagePath);

export function getTemplatesPath(fileName: string) {
  const basePath = 'templates/';

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
