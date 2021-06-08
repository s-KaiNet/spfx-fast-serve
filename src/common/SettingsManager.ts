import * as fs from 'fs';
import * as path from 'path';
import yargs from 'yargs';
import { Settings } from '../interfaces/settings';
import { ConfigFileName, FastServeFolderName, SchemaUrl } from './consts';

export class SettingsManager {
  public static createSettings(): Settings {
    const argv = yargs(process.argv.slice(2)).options({
      port: { type: 'number' }
    }).argv;

    const cliArgs: Settings['cli'] = {
      isLibraryComponent: !!argv['library-component']
    };

    if (argv.port) {
      cliArgs.port = argv.port;
    }

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
