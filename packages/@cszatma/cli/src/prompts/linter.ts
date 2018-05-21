import inquirer, { Question } from 'inquirer';
import { Optional, gitExists } from 'node-shared-utils';

import { Linter } from '../presets';

interface Answers {
  linter: string;
  lintOn: Optional<boolean>;
}

const linterQuestion = (typescript: boolean): Question<Answers> => ({
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

const lintOnQuestion: Question<Answers> = {
  name: 'lintOn',
  message: 'Lint and fix on commit?',
  type: 'confirm',
  default: true,
  when: (answers: Answers) => answers.linter !== 'none',
};

export default async function linterPrompt(
  typescript: boolean,
): Promise<Optional<Linter>> {
  // Only ask about linting on commit if the user has git
  const questions = gitExists
    ? [linterQuestion(typescript), lintOnQuestion]
    : linterQuestion(typescript);
  const { linter, lintOn } = await inquirer.prompt<Answers>(questions);

  if (!linter) {
    return undefined;
  }

  // Set the appropriate keys to later determine which packages to use
  const useEslint = linter.includes('eslint');
  const useTslint = linter.includes('tslint');
  const usePrettier = linter.includes('prettier');

  return {
    name: linter,
    options: {
      eslint: useEslint,
      tslint: useTslint,
      prettier: usePrettier,
      lintStaged: !!lintOn,
    },
    dependencies: [],
    devDependencies: [
      ...(useEslint ? ['eslint'] : []),
      ...(useTslint ? ['tslint'] : []),
      ...(usePrettier ? ['prettier'] : []),
      ...(useEslint && usePrettier
        ? ['eslint-config-prettier', 'eslint-plugin-prettier']
        : []),
      ...(useTslint && usePrettier
        ? ['tslint-config-prettier', 'tslint-plugin-prettier']
        : []),
      ...(lintOn ? ['lint-staged', 'husky'] : []),
    ],
  };
}
