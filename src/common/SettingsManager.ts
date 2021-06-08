import * as fs from 'fs';
import * as path from 'path';
import yargs from 'yargs';
import { Settings } from '../interfaces/settings';
import { ConfigFileName, FastServeFolderName, SchemaUrl, SchemaUrlOld } from './consts';
import { getSpfxMinorVersion } from './utils';

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
    let schemaUrl = SchemaUrl;
    const spfxVersion = getSpfxMinorVersion();
    if (spfxVersion === 4) {
      schemaUrl = SchemaUrlOld;
    }

    const defaultSettings: Settings = {
      $schema: schemaUrl,
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
