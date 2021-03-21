import * as fs from 'fs';
import * as path from 'path';
import { Settings } from '../interfaces/settings';
import { ConfigFileName, FastServeFolderName } from './consts';

export class SettingsManager {
  public static createSettings(): Settings {
    const args = process.argv.slice(2);
    const cliArgs: Settings['cli'] = {
      isLibraryComponent: args.indexOf('--library-component') === -1 ? undefined: true,
      usePnpm: args.indexOf('--pnpm') === -1 ? undefined: true,
      useRestProxy: args.indexOf('--rest-proxy') === -1 ? undefined: true
    };

    // remove undefined keys
    Object.keys(cliArgs).forEach((key: keyof Settings['cli']) => cliArgs[key] === undefined && delete cliArgs[key]);

    const defaultSettings: Settings = {
      cli: {
        isLibraryComponent: false,
        usePnpm: false,
        useRestProxy: false,
        ...cliArgs
      },
      serve: {
        open: true
      }
    };

    return this.ensureSettings(defaultSettings, cliArgs);
  }

  private static ensureSettings(defaultSettings: Settings, cliArgs:  Settings['cli']): Settings {
    const fastServeFolder = path.join(process.cwd(), FastServeFolderName);
    if (!fs.existsSync(fastServeFolder)) {
      fs.mkdirSync(fastServeFolder);
    }
    const configPath = path.join(fastServeFolder, ConfigFileName);
    if (!fs.existsSync(configPath)) {
      fs.writeFileSync(configPath, JSON.stringify(defaultSettings, null, 2));
      return defaultSettings;
    }

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const existingConfig: Settings = require(configPath);

    // if some settings were applied through the cli arguments, use them
    existingConfig.cli = {
      ...existingConfig.cli,
      ...cliArgs
    }

    return existingConfig;
  }
}
