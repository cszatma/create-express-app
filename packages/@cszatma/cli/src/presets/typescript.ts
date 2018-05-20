import { Preset } from './';
import { defaultPort, defaultPackageManager } from './defaultValues';

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
