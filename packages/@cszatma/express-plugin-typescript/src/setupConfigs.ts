import tsconfigConfig from './configs/tsconfig';
import tsconfigBuild from './configs/tsconfig.build';
import tslintConfig from './configs/tslint';

export interface ConfigOptions {
  tsconfig: boolean;
  tslint: boolean;
  hasFrontEnd: boolean;
  usePrettier: boolean;
}

export interface Configs {
  tsconfig: any;
  tsconfigBuild: any;
  tslint: any;
}

export default function setupConfigs(options: ConfigOptions): Configs {
  // tslint:disable-next-line:no-object-literal-type-assertion
  const configs = {} as Configs;

  if (options.tsconfig) {
    configs.tsconfig = tsconfigConfig(options.hasFrontEnd);
    configs.tsconfigBuild = tsconfigBuild;
  }

  if (options.tslint) {
    configs.tslint = tslintConfig(options.usePrettier);
  }

  return configs;
}
