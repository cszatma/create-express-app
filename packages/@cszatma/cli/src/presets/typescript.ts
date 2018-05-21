import { Preset } from './';
import {
  defaultPort,
  defaultPackageManager,
  lintOnCommit,
} from './defaultValues';
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
  linter: {
    name: 'tslint-prettier',
    options: {
      eslint: false,
      tslint: true,
      prettier: true,
      lintStaged: lintOnCommit,
    },
    dependencies: [],
    devDependencies: [
      'tslint',
      'prettier',
      'tslint-config-prettier',
      'tslint-plugin-prettier',
      ...(lintOnCommit ? ['lint-staged', 'husky'] : []),
    ],
  },
  dependencies: ['body-parser'],
  devDependencies: ['@types/express', '@types/body-parser', '@types/node'],
};

export default typescriptPreset;
