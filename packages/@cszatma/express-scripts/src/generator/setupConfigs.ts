import eslintConfig from './configs/eslint';
import lintStagedConfig from './configs/lint-staged';
import prettierConfig from './configs/prettier';

export interface ConfigOptions {
  eslint: boolean;
  tslint: boolean;
  prettier: boolean;
  typescript: boolean;
  frontEnd: boolean;
  lintStaged: boolean;
}

export interface Configs {
  eslint: any;
  lintStaged: any;
  prettier: any;
}

export default function setupConfigs(options: ConfigOptions): Configs {
  // tslint:disable-next-line:no-object-literal-type-assertion
  const configs = {} as Configs;

  // Generate each config as required
  if (options.prettier) {
    configs.prettier = prettierConfig();
  }

  if (options.eslint) {
    configs.eslint = eslintConfig(options.prettier);
  }

  if (options.lintStaged) {
    configs.lintStaged = lintStagedConfig({
      eslint: options.eslint,
      tslint: options.tslint,
      prettier: options.prettier,
      typescript: options.typescript,
      frontEnd: options.frontEnd,
    });
  }

  return configs;
}
