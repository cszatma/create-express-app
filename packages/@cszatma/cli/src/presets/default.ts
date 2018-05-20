import { defaultPort, defaultPackageManager, Preset } from './';

const defaultPreset: Preset = {
  name: 'default',
  packageManager: defaultPackageManager,
  port: defaultPort,
  dependencies: ['body-parser'],
  devDependencies: [],
};

export default defaultPreset;
