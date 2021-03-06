import { Preset } from './';
import { defaultPort, defaultPackageManager } from './defaultValues';

const reactPreset: Preset = {
  name: 'react',
  packageManager: defaultPackageManager,
  port: defaultPort,
  frontEnd: {
    name: 'react',
    options: {},
    dependencies: [],
    devDependencies: ['concurrently'],
  },
  dependencies: ['body-parser'],
  devDependencies: [],
};

export default reactPreset;
