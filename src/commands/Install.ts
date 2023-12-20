import { BaseCommand } from './BaseCommand';
import { prompt } from 'enquirer';
import { detect } from 'detect-package-manager';
import { logger } from '../common/Logger';
import chalk from 'chalk';
import { spawnProcess } from '../common/utils';

export class Install extends BaseCommand {
  public async execute(): Promise<void> {
    const pm = await detect();

    const message = `Now install dependencies ('${pm} install') and execute '${pm} run serve' afterwards.`;
    logger.info(chalk.bgMagenta.white(message));
    logger.newLine();
    const completed = 'spfx-fast-serve configuration is completed!';
    let answer: { install: boolean };

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
      logger.newLine();

      logger.info(chalk.bgMagenta.white(`Executing '${pm} install'...`));
      logger.newLine();

      await spawnProcess(pm, ['install']);

      logger.newLine();
      logger.success(chalk.green(completed));
      logger.newLine();
    } else {
      logger.newLine();
      logger.success(chalk.green(completed));
      logger.newLine();
    }
  }
}
