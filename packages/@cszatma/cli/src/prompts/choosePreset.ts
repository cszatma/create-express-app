import inquirer, { Question } from 'inquirer';
import { capitalizeString } from '@cszatma/cli-shared-utils';

import presets, { CUSTOM_PRESET_KEY, Preset } from '../presets';
import { loadOptions } from '../options';

interface Answer {
  preset: string;
}

const presetQuestion = (presetNames: string[]): Question<Answer> => ({
  name: 'preset',
  type: 'list',
  message: 'Pick a preset to use:',
  choices: [
    ...presetNames.map(preset => ({
      name: capitalizeString(preset),
      value: preset,
    })),
    {
      name: 'Manually pick options',
      value: CUSTOM_PRESET_KEY,
    },
  ],
});

export default async function choosePreset(): Promise<Preset | '__custom__'> {
  // Combine all presets
  const allPresets = { ...loadOptions().presets, ...presets };
  const { preset } = await inquirer.prompt<Answer>(
    presetQuestion(Object.keys(allPresets)),
  );

  if (preset === CUSTOM_PRESET_KEY) {
    return CUSTOM_PRESET_KEY;
  }

  return allPresets[preset];
}
