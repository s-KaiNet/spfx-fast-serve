import * as fs from 'fs';
import * as path from 'path';
import { Settings } from '../interfaces/settings';
import { ConfigFileName, FastServeFolderName, SchemaUrl } from './consts';

export class SettingsManager {
  public static createSettings(): Settings {
    const args = process.argv.slice(2);
    const cliArgs: Settings['cli'] = {
      isLibraryComponent: args.indexOf('--library-component') !== -1,
      usePnpm: args.indexOf('--pnpm') !== -1
    };

    const defaultSettings: Settings = {
      $schema: SchemaUrl,
      cli: cliArgs
    };

    const settings = this.ensureSettings(defaultSettings);

    return settings;
  }

  private static ensureSettings(defaultSettings: Settings): Settings {
    const fastServeFolder = path.join(process.cwd(), FastServeFolderName);
    if (!fs.existsSync(fastServeFolder)) {
      fs.mkdirSync(fastServeFolder);
    }

    const configPath = path.join(fastServeFolder, ConfigFileName);

    // if first run, use default settings and save to a file
    if (!fs.existsSync(configPath)) {
      fs.writeFileSync(configPath, JSON.stringify(defaultSettings, null, 2));
      return defaultSettings;
    }

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const existingConfig: Settings = require(configPath);

    return existingConfig;
  }
}
