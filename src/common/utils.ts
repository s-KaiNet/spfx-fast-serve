import * as path from 'path';
import { spawn } from 'cross-spawn';
const packagePath = path.join(process.cwd(), 'package.json');
const dependecyToCheck = '@microsoft/sp-core-library';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require(packagePath);

export function getTemplatesPath(fileName: string) {
  const basePath = 'templates/';

  return path.join(__dirname, '..', basePath + fileName);
}

export function getSpfxMinorVersion() {
  let version: string = getSpfxVersionString();

  if (version.indexOf('~') === 0 || version.indexOf('^') === 0) {
    version = version.substr(1);
  }
  return parseInt(version.split('.')[1]);
}

export function isBeta() {
  const version: string = getSpfxVersionString();

  return version.indexOf('-beta') !== -1 || version.indexOf('-rc') !== -1;
}

export async function spawnProcess(program: string, args: string[], env?: typeof process.env): Promise<void> {
  return new Promise((resolve, reject) => {
    const proc = spawn(program, args, {
      stdio: 'inherit',
      env: env || process.env
    });

    process.on('SIGTERM', () => proc.kill('SIGTERM'))
    process.on('SIGINT', () => proc.kill('SIGINT'))
    process.on('SIGBREAK', () => proc.kill('SIGBREAK'))
    process.on('SIGHUP', () => proc.kill('SIGHUP'))

    proc.on('exit', (code, signal) => {
      let crossEnvExitCode = code
      if (crossEnvExitCode === null) {
        crossEnvExitCode = signal === 'SIGINT' ? 0 : 1
      }

      if (crossEnvExitCode === 1) {
        reject();
      } else {
        resolve();
      }
    });
  });
}

function getSpfxVersionString() {
  let version: string = packageJson.dependencies[dependecyToCheck];

  if (!version) { // try version from yo-rc.json
    const yoPath = path.join(process.cwd(), '.yo-rc.json');
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const yoJson = require(yoPath);
    version = yoJson['@microsoft/generator-sharepoint']?.version;

    if (!version) {
      throw new Error('Cannot find SPFx version in package.json or .yo-rc.json');
    }

    return version;

  } else {
    return version;
  }
}
