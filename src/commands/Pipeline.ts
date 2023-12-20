import { BaseCommand } from './BaseCommand';

export class Pipeline {
  private commands: BaseCommand[];

  constructor(...commands: BaseCommand[]) {
    this.commands = commands;
  }

  public async execute(): Promise<void> {
    for (const command of this.commands) {
      await command.execute();
    }
  }
}
