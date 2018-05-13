export interface Plugin {
  name: string;
  options: any;
}

export interface Dependency {
  name: string;
  type?: '-D';
}

export interface Preset {
  packageManager: 'yarn' | 'npm';
  transpiler?: Plugin;
  linter?: Plugin;
  frontEnd?: Plugin;
  extraPackages: Dependency[];
}

const defaultPackages = () => [{ name: 'body-parser' }];

const defaultPreset: Preset = {
  packageManager: 'yarn',
  extraPackages: defaultPackages(),
};

const typescriptPreset: Preset = {
  packageManager: 'yarn',
  transpiler: {
    name: '@cszatma/express-plugin-typescript',
    options: {},
  },
  extraPackages: [...defaultPackages(), { name: '@types/express' }],
};

const reactPreset: Preset = {
  packageManager: 'yarn',
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
