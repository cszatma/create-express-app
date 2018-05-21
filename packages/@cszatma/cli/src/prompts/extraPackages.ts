import inquirer, { Question } from 'inquirer';

import { Dependencies } from '../utils/flattenPresetDeps';

interface Answer {
  extraPackages: string[];
}

const extraPackagesQuestion: Question<Answer> = {
  name: 'extraPackages',
  type: 'checkbox',
  message: 'Select any additional packages:',
  choices: [
    {
      name: 'body-parser',
      value: 'body-parser',
    },
    {
      name: 'cookie-session',
      value: 'cookie-session',
    },
    {
      name: 'mongoose',
      value: 'mongoose',
    },
  ],
};

export default async function extraPackagesPrompt(
  usingTypescript: boolean,
): Promise<Dependencies> {
  const { extraPackages } = await inquirer.prompt<Answer>(
    extraPackagesQuestion,
  );

  // Add type definitions for each package if using typescript
  const typedefs = usingTypescript
    ? extraPackages
        .map(pkg => `@types/${pkg}`)
        .concat(['@types/express', '@types/node'])
    : [];

  return {
    dependencies: extraPackages,
    devDependencies: typedefs,
  };
}
