import inquirer, { Question } from 'inquirer';
import { defaultPort } from '../presets/defaultValues';

interface Answer {
  port: string;
}

const portQuestion: Question<Answer> = {
  name: 'port',
  type: 'input',
  message: 'What port should the server run on?',
  default: defaultPort,
  validate: (value: string) => {
    // Make sure it's an int
    if (parseInt(value, 10)) {
      return true;
    }

    return 'Please enter a valid number';
  },
};

export default async function portPrompt(): Promise<number> {
  const { port } = await inquirer.prompt<Answer>(portQuestion);

  return parseInt(port, 10);
}
