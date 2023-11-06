import { BaseCommand } from './BaseCommand';

export class Pipeline {
  private commands: BaseCommand[];

  constructor(...commands: BaseCommand[]) {
    this.commands = commands;
  }

  public execute(): void {
    for (const command of this.commands) {
      command.execute();
    }
  }
}
