import { SettingsManager } from '../common/SettingsManager';
import { Settings } from '../interfaces/settings';
import { BaseCommand } from './BaseCommand';

export class Pipeline {
  private commands: BaseCommand[];
  private settings: Settings;

  constructor(...commands: BaseCommand[]) {
    this.commands = commands;
    this.settings = SettingsManager.createSettings();
  }

  public execute(): void {
    for (const command of this.commands) {
      command.execute(this.settings);
    }
  }
}
