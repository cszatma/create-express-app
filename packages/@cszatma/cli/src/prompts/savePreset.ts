import inquirer, { Question } from 'inquirer';
import { Optional } from '@cszatma/cli-shared-utils';

import presets from '../presets';

interface Answers {
  savePreset: boolean;
  presetName?: string;
}

const questions: Question<Answers>[] = [
  {
    name: 'savePreset',
    type: 'confirm',
    message: 'Save selections as a preset for future use?',
    default: true,
  },
  {
    name: 'presetName',
    type: 'input',
    message: 'Save preset as:',
    when: (answers: Answers) => answers.savePreset === true,
    validate: (value: string) => {
      // Make sure a name is entered that doesn't conflict with an internal preset
      if (value === '') {
        return 'Please enter a name for this configuration';
      } else if (Object.keys(presets).includes(value)) {
        return `${value} is already take, please choose a different name`;
      } else if (value === '__custom__') {
        return `Can't use __custom__ as a name as it is used internally`;
      }

      return true;
    },
  },
];

export default async function savePresetPrompt(): Promise<Optional<string>> {
  const { presetName } = await inquirer.prompt<Answers>(questions);
  return presetName;
}
