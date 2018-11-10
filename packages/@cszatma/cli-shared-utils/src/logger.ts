import chalk from 'chalk';

export function logError(message?: any, ...optionalParams: any[]) {
  console.error(chalk.red(message, ...optionalParams));
}

export function logSuccess(message?: any, ...optionalParams: any[]) {
  console.log(chalk.green(message, ...optionalParams));
}

export function exitFailure(
  message?: any,
  statusCode: number = 1,
  ...optionalParams: any[]
) {
  logError(message, ...optionalParams);
  process.exit(statusCode);
}

export function exitSuccess(message?: any, ...optionalParams: any[]) {
  logSuccess(message, ...optionalParams);
  process.exit(0);
}
