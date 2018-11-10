import { Command } from 'commander';
import { exitSuccess } from '@cszatma/cli-shared-utils';

import create from './create';
import { removePreset } from './options';

const packageJson = require('../package.json');

const program = new Command(packageJson.name)
  .version(packageJson.version, '-v,--version')
  .arguments('<project-name>')
  .usage('<project-name> [options]')
  .option('-f,--force', 'Overwrite the directory if it already exists')
  .option('--use-npm', 'Use npm as the package manager')
  .option('--no-git', 'Does not create a git repo in the project')
  .action(create);

program
  .command('remove-preset <preset-name>')
  .description('Removes the given custom preset')
  .usage('remove-preset <preset-name>')
  .action((presetName: string) => {
    const status = removePreset(presetName);

    if (status === 1) {
      console.log(`${presetName} preset does not exist. Nothing to delete!\n`);
      process.exit(0);
      return;
    } else {
      exitSuccess(`Removed ${presetName} preset.\n`);
    }
  });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
