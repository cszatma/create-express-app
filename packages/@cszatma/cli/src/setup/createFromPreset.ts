import path from 'path';
import chalk from 'chalk';
import { logWithSpinner, stopSpinner } from 'node-shared-utils';
import { writeTemplate } from 'js-template-parser';

import { Preset } from '../presets';
import getPackages, { resolveProjectDep } from '../utils/getPackages';
import { combineDependencies } from '../utils/flattenPresetDeps';
import setupTranspiler from './setupTranspiler';
import setupLinter from './setupLinter';
import PackageJson from '../utils/packageJson';
import addEngines from './addEngines';

const defaultDependences = {
  dependencies: ['express'],
  devDependencies: ['nodemon', getPackages().expressScripts],
};

export default async function createFromPreset(
  preset: Preset,
  packageJson: PackageJson,
  targetDir: string,
): Promise<void> {
  // Add the engines property to the package.json
  addEngines(packageJson, preset.packageManager);

  const ceaPackages = getPackages();
  stopSpinner(true);

  // Get all the dependencies needed
  const allDeps = combineDependencies(defaultDependences, preset);

  // Install all the dependencies
  console.log(
    '📦',
    `Installing ${allDeps.dependencies
      .map(dep => chalk.green(dep))
      .join(', ')} as dependencies...\n`,
  );
  await packageJson.install(preset.packageManager, allDeps.dependencies);
  // await install(preset.packageManager, allDeps.dependencies, targetDir, []);

  // Install all the devDependencies
  console.log(
    '\n📦',
    `Installing ${allDeps.devDependencies
      .map(dep => chalk.green(dep))
      .join(', ')} as devDependencies...\n`,
  );
  await packageJson.install(preset.packageManager, allDeps.devDependencies, [
    '-D',
  ]);
  // await install(preset.packageManager, allDeps.devDependencies, targetDir, [
  //   '-D',
  // ]);

  // Generate the template files
  const generateTemplate = require(resolveProjectDep(
    '@cszatma/express-scripts/build/generateTemplate',
  )).default;

  logWithSpinner('\n📁', 'Generating project files...\n');

  const options = {
    name: path.basename(targetDir),
    port: preset.port,
    bodyParser: allDeps.dependencies.includes('body-parser'),
  };
  await generateTemplate(writeTemplate, { options }, targetDir);

  stopSpinner(true);

  // Setup each additional part

  // Setup transpiler
  if (preset.transpiler) {
    logWithSpinner('🚀', `Setting up ${preset.transpiler.name}...\n`);

    await setupTranspiler(preset, targetDir, {
      options,
    });
  }

  // Setup eslint/tslint/prettier/lint-staged
  if (preset.linter) {
    logWithSpinner(
      '🗃️',
      `Setting up ${preset.linter.name
        .split('-')
        .map(l => chalk.green(l))
        .join(' and ')}...\n`,
    );

    setupLinter(preset, targetDir, packageJson);
  }

  packageJson.write();
  stopSpinner(true);
}
