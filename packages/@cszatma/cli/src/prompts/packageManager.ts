import inquirer, { Question } from 'inquirer';
import { yarnExists, logError } from 'node-shared-utils';

import { PackageManager } from '../presets';

interface Answer {
  packageManager: PackageManager;
}

const packageManagerQuestion: Question<Answer> = {
  name: 'packageManager',
  type: 'list',
  message: 'Pick the package manager to use:',
  choices: [
    {
      name: 'Use Yarn',
      value: 'yarn',
    },
    {
      name: 'Use NPM',
      value: 'npm',
    },
  ],
};

export default async function packageManagerPrompt(): Promise<PackageManager> {
  const { packageManager } = await inquirer.prompt<Answer>(
    packageManagerQuestion,
  );

  // Make sure yarn is installed otherwise use npm
  if (packageManager === 'yarn' && !yarnExists()) {
    logError('yarn is not installed on your machine. Using npm instead.\n');
    return 'npm';
  }

  return packageManager;
}
