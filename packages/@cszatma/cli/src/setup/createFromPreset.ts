import path from 'path';
import chalk from 'chalk';
import { logWithSpinner, stopSpinner } from 'node-shared-utils';
import { writeTemplate } from 'js-template-parser';

import { Preset } from '../presets';
import getPackages, { resolveProjectDep } from '../utils/getPackages';
import install from '../utils/install';
import { combineDependencies } from '../utils/flattenPresetDeps';

const defaultDependences = {
  dependencies: ['express'],
  devDependencies: ['nodemon', getPackages().expressScripts],
};

export default async function createFromPreset(
  preset: Preset,
  packageJson: any,
  targetDir: string,
): Promise<void> {
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
  await install(preset.packageManager, allDeps.dependencies, targetDir, []);

  // Install all the devDependencies
  console.log(
    '\n📦',
    `Installing ${allDeps.devDependencies
      .map(dep => chalk.green(dep))
      .join(', ')} as devDependencies...\n`,
  );
  await install(preset.packageManager, allDeps.devDependencies, targetDir, [
    '-D',
  ]);

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
}
