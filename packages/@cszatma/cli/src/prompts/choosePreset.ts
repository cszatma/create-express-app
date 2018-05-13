import inquirer, { Question } from 'inquirer';

import presets, { Preset } from '../presets';

interface Answer {
  preset: string;
}

const presetQuestion: Question = {
  name: 'preset',
  type: 'list',
  message: 'Pick a preset to use:',
  choices: [
    {
      name: 'Default',
      value: 'defaultPreset',
    },
    {
      name: 'Typescript',
      value: 'typescriptPreset',
    },
    {
      name: 'React',
      value: 'reactPreset',
    },
    {
      name: 'Manually pick options',
      value: 'custom',
    },
  ],
};

export default async function choosePreset(): Promise<Preset | 'custom'> {
  const { preset } = await inquirer.prompt<Answer>(presetQuestion);

  if (preset === 'custom') {
    return 'custom';
  }

  return presets[preset];
}
