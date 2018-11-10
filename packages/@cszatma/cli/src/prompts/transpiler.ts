import inquirer, { Question } from 'inquirer';
import { Optional } from '@cszatma/cli-shared-utils';

import { Plugin, Transpiler } from '../presets';
import getPackages from '../utils/getPackages';

interface Answer {
  transpiler: Transpiler | 'none';
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

  if (transpiler === 'none') {
    return undefined;
  }

  return generateTranspilerPlugin(transpiler);
}

function generateTranspilerPlugin(transpiler: Transpiler): Plugin {
  return {
    name: transpiler,
    options: {},
    dependencies: [],
    devDependencies: [getPackages()[transpiler]],
  };
}
