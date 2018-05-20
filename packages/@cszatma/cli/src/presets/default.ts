import { Preset } from './';
import { defaultPort, defaultPackageManager } from './defaultValues';

const defaultPreset: Preset = {
  name: 'default',
  packageManager: defaultPackageManager,
  port: defaultPort,
  dependencies: ['body-parser'],
  devDependencies: [],
};

export default defaultPreset;
