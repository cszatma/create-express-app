import inquirer, { Question } from 'inquirer';
import { defaultPort } from '../presets';

interface Answer {
  port: string;
}

const portQuestion: Question<Answer> = {
  name: 'port',
  type: 'input',
  message: 'What port should the server run on? (8000)',
  validate: (value: string) => {
    // Valid as it is assumed that the user wants the default
    if (value.trim() === '') {
      return true;
    }

    const port = parseInt(value, 10);
    if (port) {
      return true;
    }

    return 'Please enter a valid number';
  },
};

export default async function portPrompt(): Promise<number> {
  const { port } = await inquirer.prompt<Answer>(portQuestion);

  // Stick to the default port
  if (port === '') {
    return defaultPort;
  }

  return parseInt(port, 10);
}
