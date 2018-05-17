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

export const rcPath = path.join(os.homedir(), '.cearc');

export function loadOptions(): Optional<Options> {
  if (fs.existsSync(rcPath)) {
    try {
      return JSON.parse(fs.readFileSync(rcPath, 'utf-8'));
    } catch (error) {
      exitFailure(
        `Error loading saved preferences. ~/.cearc might be corrupted or have synatx errors. Please fix/delete it then rerun create-express-app.\n(${
          error.message
        }`,
      );
    }
  } else {
    return undefined;
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
