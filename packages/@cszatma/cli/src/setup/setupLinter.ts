import path from 'path';
import fs from 'fs-extra';
import createJSFile from '../utils/createJSFile';

import { Preset } from '../presets';
import { resolveProjectDep } from '../utils/getPackages';
import PackageJson from '../utils/PackageJson';

export default function setupLinter(
  preset: Preset,
  targetDir: string,
  packageJson: PackageJson,
): void {
  const usingTypescript =
    preset.transpiler && preset.transpiler.name === 'typescript';

  const { setupConfigs } = require(resolveProjectDep(
    '@cszatma/express-scripts',
  )).default;

  // Ignore error since this function is only called when linter is not undefined
  const options = {
    ...preset.linter!.options,
    typescript: usingTypescript,
    frontEnd: !!preset.frontEnd,
  };

  const configs = setupConfigs(options);

  // Write eslint config
  if (configs.eslint) {
    fs.writeFileSync(
      path.join(targetDir, '.eslintrc.js'),
      createJSFile(configs.eslint),
    );

    packageJson.addScript('lint', 'eslint --fix');
  }

  // Write prettier config
  if (configs.prettier) {
    fs.writeFileSync(
      path.join(targetDir, 'prettier.config.js'),
      createJSFile(configs.prettier),
    );

    packageJson.addScript(
      'format',
      `prettier --write "src/**/*.${usingTypescript ? '(js|ts)' : 'js'}"`,
    );
  }

  // Write lint-staged & husky configs
  if (configs.lintStaged) {
    packageJson.addField('lint-staged', configs.lintStaged);
    const huskyConfig = { hooks: { 'pre-commit': 'lint-staged' } };
    packageJson.addField('husky', huskyConfig);
    // packageJson.addScript('precommit', 'lint-staged');
  }

  // Setup tslint
  if (usingTypescript) {
    const setupTSConfigs = require(resolveProjectDep(
      '@cszatma/express-plugin-typescript/build/setupConfigs',
    )).default;

    const { tslint } = setupTSConfigs({
      tslint: true,
      usePrettier: preset.linter!.options.prettier,
    });

    // Write the tslint config
    fs.writeFileSync(
      path.join(targetDir, 'tslint.json'),
      JSON.stringify(tslint, null, 2),
    );

    packageJson.addScript(
      'lint',
      'tslint -c ./tslint.json -p ./tsconfig.json --fix',
    );
  }
}
