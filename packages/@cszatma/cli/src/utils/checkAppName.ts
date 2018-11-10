import chalk from 'chalk';
import validateProjectName from 'validate-npm-package-name';
import { logError } from '@cszatma/cli-shared-utils';

export default function checkAppName(appName: string): void {
  const validationResult = validateProjectName(appName);

  if (!validationResult.validForNewPackages) {
    logError(
      `Could not create a project called ${chalk.cyan(
        `"${appName}"`,
      )} because of npm naming restrictions:`,
    );

    printValidationResults(validationResult.errors);
    printValidationResults(validationResult.warnings);
    process.exit(1);
  }
}

function printValidationResults(results?: string[]): void {
  if (typeof results !== 'undefined') {
    results.forEach(error => {
      console.error(chalk.red(`  *  ${error}`));
    });
  }
}
