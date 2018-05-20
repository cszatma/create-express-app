import { defaultPort, defaultPackageManager, Preset } from './';

const typescriptPreset: Preset = {
  name: 'typescript',
  packageManager: defaultPackageManager,
  port: defaultPort,
  transpiler: {
    name: 'typescript',
    options: {},
    dependencies: [],
    devDependencies: ['@cszatma/express-plugin-typescript'],
  },
  dependencies: ['body-parser'],
  devDependencies: ['@types/express', '@types/body-parser'],
};

export default typescriptPreset;
