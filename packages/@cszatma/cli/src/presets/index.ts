import { yarnExists } from 'node-shared-utils';

import defaultPreset from './default';
import typescriptPreset from './typescript';
import reactPreset from './react';

// Types
export type PackageManager = 'yarn' | 'npm';
export type Transpiler = 'babel' | 'typescript';

export interface Plugin {
  name: string;
  options: any;
  dependencies: string[];
  devDependencies: string[];
}

export interface Preset {
  name: string;
  packageManager: PackageManager;
  port: number;
  transpiler?: Plugin;
  linter?: Plugin;
  frontEnd?: Plugin;
  dependencies: string[];
  devDependencies: string[];
}

// Constants
export const defaultPackageManager = yarnExists() ? 'yarn' : 'npm';

export const defaultPort = 8000;
export const CUSTOM_PRESET_KEY = '__custom__';

const presets: { [key: string]: Preset } = {
  default: defaultPreset,
  typescript: typescriptPreset,
  react: reactPreset,
};

export default presets;
