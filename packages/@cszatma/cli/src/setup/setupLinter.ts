import path from 'path';
import fs from 'fs-extra';
import createJSFile from '../utils/createJSFile';

import { Preset } from '../presets';
import { resolveProjectDep } from '../utils/getPackages';

export default function setupLinter(
  preset: Preset,
  targetDir: string,
  packageJson: any,
): void {
  const setupConfigs = require(resolveProjectDep(
    '@cszatma/express-scripts/build/setupConfigs',
  )).default;

  // Ignore error since this function is only called when linter is not undefined
  const options = {
    ...preset.linter!.options,
    typescript: preset.transpiler && preset.transpiler.name === 'typescript',
    frontEnd: !!preset.frontEnd,
  };

  const configs = setupConfigs(options);

  // Write eslint config
  if (configs.eslint) {
    fs.writeFileSync(
      path.join(targetDir, '.eslintrc.js'),
      createJSFile(configs.eslint),
    );
  }

  // Write prettier config
  if (configs.prettier) {
    fs.writeFileSync(
      path.join(targetDir, 'prettier.config.js'),
      createJSFile(configs.prettier),
    );
  }

  // Write lint-staged config
  if (configs.lintStaged) {
    packageJson['lint-staged'] = configs.lintStaged;
  }
}
