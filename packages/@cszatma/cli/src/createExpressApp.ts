import { Command } from 'commander';

import create from './create';

const packageJson = require('../package.json');

const program = new Command(packageJson.name)
  .version(packageJson.version, '-v,--version')
  .arguments('<project-name>')
  .usage('<project-name> [options]')
  .option('-f,--force', 'Overwrite the directory if it already exists')
  .option('--use-npm', 'Use npm as the package manager')
  .option('--no-git', 'Does not create a git repo in the project')
  .action(create);

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
