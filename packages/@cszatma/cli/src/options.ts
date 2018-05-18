import path from 'path';
import os from 'os';
import fs from 'fs-extra';
import { exitFailure, logError } from 'node-shared-utils';

import { Preset } from './presets';

export interface Options {
  presets: {
    [key: string]: Preset;
  };
}

// Store the options in the user's home directory
export const rcPath = path.join(os.homedir(), '.cearc');

let cachedOptions: Options;

export function loadOptions(): Options {
  // Cache the options so they can retrieved quickly and easily later
  if (cachedOptions) {
    return cachedOptions;
  }

  if (fs.existsSync(rcPath)) {
    // Read ~/.cearc
    try {
      cachedOptions = JSON.parse(fs.readFileSync(rcPath, 'utf-8'));
    } catch (error) {
      exitFailure(
        `Error loading saved preferences. ~/.cearc might be corrupted or have synatx errors. Please fix/delete it then rerun create-express-app.\n(${
          error.message
        }`,
      );
    }

    return cachedOptions;
  } else {
    return { presets: {} };
  }
}

export function saveOptions(options: Options): void {
  try {
    fs.writeFileSync(rcPath, JSON.stringify(options, null, 2));
  } catch (error) {
    logError(
      `Error writing preferences: make sure you have write access to ${rcPath}.\n(${
        error.message
      })`,
    );
  }
}

export function savePreset(preset: Preset): void {
  const options = loadOptions() || { presets: {} };
  options.presets[preset.name] = preset;

  saveOptions(options);
}

export function removePreset(presetName: string): number {
  const options = loadOptions();

  if (!options.presets[presetName]) {
    // Preset doesn't exist, return 1 to indicate this to the caller
    return 1;
  }

  // Remove the preset
  delete options.presets[presetName];
  saveOptions(options);
  return 0;
}
