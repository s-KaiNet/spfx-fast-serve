export abstract class BaseCommand {
  public abstract  execute(): Promise<void>;
}
