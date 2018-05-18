import inquirer, { Question } from 'inquirer';
import { Optional } from 'node-shared-utils';

import { Plugin } from '../presets';

interface Answer {
  transpiler: string;
}

const transpilerQuestion: Question<Answer> = {
  name: 'transpiler',
  type: 'list',
  message: 'Pick a transpiler to use:',
  choices: [
    {
      name: 'Babel',
      value: 'babel',
    },
    {
      name: 'Typescript',
      value: 'typescript',
    },
    {
      name: 'None',
      value: 'none',
    },
  ],
};

export default async function transpilerPrompt(): Promise<Optional<Plugin>> {
  const { transpiler } = await inquirer.prompt<Answer>(transpilerQuestion);

  if (transpiler === 'babel') {
    return {
      name: 'babel',
      options: {},
      dependencies: [],
      devDependencies: [],
    };
  } else if (transpiler === 'typescript') {
    return {
      name: 'typescript',
      options: {},
      dependencies: [],
      devDependencies: [],
    };
  }

  return undefined;
}
