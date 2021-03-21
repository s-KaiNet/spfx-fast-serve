import * as path from 'path';
const packagePath = path.join(process.cwd(), 'package.json');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require(packagePath);

export function getTemplatesPath(fileName: string) {
  const dependecyToCheck = '@microsoft/sp-webpart-workbench';
  const minorVersion = parseInt(packageJson.devDependencies[dependecyToCheck].split('.')[1]);
  let basePath = 'templates/';

  if (minorVersion >= 9) {
    basePath += 'latest/';
  } else if (minorVersion < 9 && minorVersion > 4) {
    basePath += '1.7.1/';
  } else if (minorVersion === 4) {
    basePath += '1.4.1/';
  } else {
    throw new Error('SharePoint Framework with version ' + packageJson.devDependencies[dependecyToCheck] + 'is not supported.');
  }

  return path.join(__dirname, basePath + fileName);
}
