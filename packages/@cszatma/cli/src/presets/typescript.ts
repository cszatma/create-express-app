import { Preset } from './';
import { defaultPort, defaultPackageManager } from './defaultValues';
import getPackages from '../utils/getPackages';

const typescriptPreset: Preset = {
  name: 'typescript',
  packageManager: defaultPackageManager,
  port: defaultPort,
  transpiler: {
    name: 'typescript',
    options: {},
    dependencies: [],
    devDependencies: [getPackages().typescript],
  },
  dependencies: ['body-parser'],
  devDependencies: ['@types/express', '@types/body-parser', '@types/node'],
};

export default typescriptPreset;
