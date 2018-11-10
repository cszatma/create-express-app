import chalk from 'chalk';
import ora from 'ora';

import { Optional } from './index';

export interface Message {
  symbol: string;
  text: string;
}

const spinner = ora();
let lastMsg: Optional<Message>;

export function logWithSpinner(symbol: string, message?: string): void {
  if (!message) {
    message = symbol;
    symbol = chalk.green('✔');
  }

  if (lastMsg) {
    spinner.stopAndPersist({
      symbol: lastMsg.symbol,
      text: lastMsg.text,
    });
  }

  spinner.text = `${symbol} ${message}`;
  lastMsg = {
    symbol: `${symbol} `,
    text: message,
  };

  spinner.start();
}

export function stopSpinner(persist?: boolean): void {
  if (lastMsg && persist) {
    spinner.stopAndPersist({
      symbol: lastMsg.symbol,
      text: lastMsg.text,
    });
  } else {
    spinner.stop();
  }

  lastMsg = undefined;
}

export function pauseSpinner(): void {
  spinner.stop();
}

export function resumeSpinner(): void {
  spinner.start();
}
