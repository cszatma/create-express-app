import { yarnExists } from 'node-shared-utils';

export interface Plugin {
  name: string;
  options: any;
  dependencies: string[];
  devDependencies: string[];
}

export interface Preset {
  name: string;
  packageManager: 'yarn' | 'npm';
  port: number;
  transpiler?: Plugin;
  linter?: Plugin;
  frontEnd?: Plugin;
  dependencies: string[];
  devDependencies: string[];
}

const defaultDependencies = () => ['body-parser'];
const packageManager = yarnExists() ? 'yarn' : 'npm';

export const defaultPort = 8000;
export const CUSTOM_PRESET_KEY = '__custom__';

/* Built-in Presets */
const defaultPreset: Preset = {
  name: 'default',
  packageManager,
  port: defaultPort,
  dependencies: defaultDependencies(),
  devDependencies: [],
};

const typescriptPreset: Preset = {
  name: 'typescript',
  packageManager,
  port: defaultPort,
  transpiler: {
    name: 'typescript',
    options: {},
    dependencies: [],
    devDependencies: [],
  },
  dependencies: defaultDependencies(),
  devDependencies: ['@types/express', '@types/body-parser'],
};

const reactPreset: Preset = {
  name: 'react',
  packageManager,
  port: defaultPort,
  frontEnd: {
    name: 'react',
    options: {},
    dependencies: [],
    devDependencies: ['concurrently'],
  },
  dependencies: defaultDependencies(),
  devDependencies: [],
};
/* End Built-in Presets */

const presets: { [key: string]: Preset } = {
  default: defaultPreset,
  typescript: typescriptPreset,
  react: reactPreset,
};

export default presets;
