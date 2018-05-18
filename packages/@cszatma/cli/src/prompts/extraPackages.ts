import inquirer, { Question } from 'inquirer';

interface Answer {
  extraPackages: string[];
}

interface Packages {
  dependencies: string[];
  devDependencies: string[];
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
): Promise<Packages> {
  const { extraPackages } = await inquirer.prompt<Answer>(
    extraPackagesQuestion,
  );

  // Add type definitions for each package if using typescript
  const typedefs = usingTypescript
    ? extraPackages.map(pkg => `@types/${pkg}`)
    : [];

  return {
    dependencies: extraPackages,
    devDependencies: typedefs,
  };
}
