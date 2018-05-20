import { defaultPort, defaultPackageManager, Preset } from './';

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
