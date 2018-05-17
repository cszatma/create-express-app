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
const defaultPort = 8000;

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
    name: '@cszatma/express-plugin-typescript',
    options: {},
    dependencies: [],
    devDependencies: [],
  },
  dependencies: defaultDependencies(),
  devDependencies: ['@types/express'],
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

const presets: { [key: string]: Preset } = {
  defaultPreset,
  typescriptPreset,
  reactPreset,
};

export default presets;
