import { Preset } from './';
import {
  defaultPort,
  defaultPackageManager,
  lintOnCommit,
} from './defaultValues';

const defaultPreset: Preset = {
  name: 'default',
  packageManager: defaultPackageManager,
  port: defaultPort,
  linter: {
    name: 'eslint-prettier',
    options: {
      eslint: true,
      tslint: false,
      prettier: true,
      lintStaged: lintOnCommit,
    },
    dependencies: [],
    devDependencies: [
      'eslint',
      'prettier',
      'eslint-config-prettier',
      'eslint-plugin-prettier',
      ...(lintOnCommit ? ['lint-staged', 'husky'] : []),
    ],
  },
  dependencies: ['body-parser'],
  devDependencies: [],
};

export default defaultPreset;
