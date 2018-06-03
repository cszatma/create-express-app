const chalk = require('chalk');

module.exports = (status, command) => {
  if (status !== 0) {
    console.log(chalk.red(`${command} exited with code ${status}`));
    return process.exit(1);
  }
};
