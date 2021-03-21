/* eslint-disable no-console */
import logSymbols from 'log-symbols';

class Logger {
  private logger: (...args: any[]) => void;

  constructor() {
    const args = process.argv.slice(2);
    const silent = args.indexOf('--silent') !== -1;

    if (silent) {
      this.logger = () => 0;
    } else {
      this.logger = console.log;
    }
  }

  public success(message: string) {
    this.logger(logSymbols.success, message);
  }

  public log(message: string) {
    this.logger(message);
  }

  public warning(message: string) {
    this.logger(logSymbols.warning, message);
  }

  public newLine() {
    this.logger('');
  }
}

export const logger = new Logger();
