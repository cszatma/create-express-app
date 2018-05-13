import { yarnExists } from 'node-shared-utils';

export interface Plugin {
  name: string;
  options: any;
}

export interface Dependency {
  name: string;
  type?: '-D';
}

export interface Preset {
  name: string;
  packageManager: 'yarn' | 'npm';
  transpiler?: Plugin;
  linter?: Plugin;
  frontEnd?: Plugin;
  extraPackages: Dependency[];
}

const defaultPackages = () => [{ name: 'body-parser' }];
const packageManager = yarnExists() ? 'yarn' : 'npm';

const defaultPreset: Preset = {
  name: 'default',
  packageManager,
  extraPackages: defaultPackages(),
};

const typescriptPreset: Preset = {
  name: 'typescript',
  packageManager,
  transpiler: {
    name: '@cszatma/express-plugin-typescript',
    options: {},
  },
  extraPackages: [...defaultPackages(), { name: '@types/express' }],
};

const reactPreset: Preset = {
  name: 'react',
  packageManager,
  frontEnd: {
    name: 'react',
    options: {},
  },
  extraPackages: defaultPackages(),
};

const presets: { [key: string]: Preset } = {
  defaultPreset,
  typescriptPreset,
  reactPreset,
};

export default presets;
