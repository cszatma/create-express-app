import inquirer, { Question } from 'inquirer';
import { Optional, gitExists } from 'node-shared-utils';

import { Plugin } from '../presets';

interface Answer {
  linter: string;
  lintOn?: boolean;
}

const linterQuestion = (typescript: boolean): Question<Answer> => ({
  name: 'linter',
  type: 'list',
  message: 'Pick a linter and/or formatting option:',
  choices: [
    {
      name: 'ESLint',
      value: 'eslint',
    },
    {
      name: 'ESLint + Prettier',
      value: 'eslint-prettier',
    },
    {
      name: 'Prettier',
      value: 'prettier',
    },
    ...(typescript
      ? [
          {
            name: 'TSLint',
            value: 'tslint',
          },
          {
            name: 'TSLint + Prettier',
            value: 'tslint-prettier',
          },
        ]
      : []),
    {
      name: 'None',
      value: 'none',
    },
  ],
});

const lintOnQuestion: Question<Answer> = {
  name: 'lintOn',
  message: 'Lint and fix on commit?',
  type: 'confirm',
  default: true,
};

export default async function linterPrompt(
  typescript: boolean,
): Promise<Optional<Plugin>> {
  // Only ask about linting on commit if the user has git
  const questions = gitExists
    ? [linterQuestion(typescript), lintOnQuestion]
    : linterQuestion(typescript);
  const { linter, lintOn } = await inquirer.prompt<Answer>(questions);

  if (!linter) {
    return undefined;
  }

  // Set the appropriate keys to later determine which packages to use
  return {
    name: 'linter',
    options: {
      eslint: linter.includes('eslint'),
      tslint: linter.includes('tslint'),
      prettier: linter.includes('prettier'),
      lintOn,
    },
    dependencies: [],
    devDependencies: lintOn ? ['lint-staged', 'husky'] : [],
  };
}
