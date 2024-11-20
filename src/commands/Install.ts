import { BaseCommand } from './BaseCommand';
import { prompt } from 'enquirer';
import { detect, PM } from 'detect-package-manager';
import { logger } from '../common/Logger';
import chalk from 'chalk';
import { spawnProcess } from '../common/utils';

export class Install extends BaseCommand {

  private force: boolean;

  constructor() {
    super();

    const args = process.argv.slice(2);
    this.force = args.indexOf('--force-install') !== -1;
  }

  public async execute(): Promise<void> {
    const pm = await detect();

    const message = `Now install dependencies ('${pm} install') and execute '${pm} run serve' afterwards.`;
    const completed = 'spfx-fast-serve configuration is completed!';
    let answer: { install: boolean };

    if (this.force) {
      await this.installDependencies(pm, completed);
      return;
    }

    logger.info(chalk.bgMagenta.white(message));
    logger.newLine();

    try {
      answer = await prompt<{ install: boolean }>({
        name: 'install',
        type: 'confirm',
        initial: true,
        message: 'Do you want to install the dependencies now? ("Enter" to install, "Esc" to finish without installing)',
      });
    } catch (error) {
      logger.newLine();
      logger.success(chalk.green(completed));
      logger.newLine();
      return;
    }

    if (answer.install) {
      await this.installDependencies(pm, completed);
    } else {
      logger.newLine();
      logger.success(chalk.green(completed));
      logger.newLine();
    }
  }

  private async installDependencies(pm: PM, message: string): Promise<void> {
    logger.newLine();

    logger.info(chalk.bgMagenta.white(`Executing '${pm} install'...`));
    logger.newLine();

    await spawnProcess(pm, ['install']);

    logger.newLine();
    logger.success(chalk.green(message));
    logger.newLine();
  }
}
