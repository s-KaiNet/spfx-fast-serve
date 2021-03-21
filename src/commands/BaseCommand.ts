import { Settings } from '../interfaces/settings';

export abstract class BaseCommand {
  public abstract execute(settings: Settings): void;
}
