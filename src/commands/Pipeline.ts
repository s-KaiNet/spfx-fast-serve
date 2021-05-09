import { Settings } from '../interfaces/settings';
import { BaseCommand } from './BaseCommand';

export class Pipeline {
  private commands: BaseCommand[];

  constructor(private settings: Settings, ...commands: BaseCommand[]) {
    this.commands = commands;
  }

  public execute(): void {
    for (const command of this.commands) {
      command.execute(this.settings);
    }
  }
}
