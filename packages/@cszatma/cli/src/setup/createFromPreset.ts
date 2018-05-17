import path from 'path';
import { logWithSpinner, stopSpinner } from 'node-shared-utils';
import { writeTemplate } from 'js-template-parser';

import { Preset } from '../presets';
import getPackages, { resolveProjectDep } from '../utils/getPackages';
import install from '../utils/install';

const defaultDependencies = ['express'];
const defaultDevDependencies = ['nodemon'];

export default async function createFromPreset(
  preset: Preset,
  packageJson: any,
  targetDir: string,
): Promise<void> {
  const ceaPackages = getPackages();
  stopSpinner(true);

  // Install main required packages
  const dependencies = [...defaultDependencies, ...preset.dependencies];
  console.log(
    '📦',
    `Installing ${dependencies.join(', ')} as dependencies...\n`,
  );
  await install(preset.packageManager, defaultDependencies, targetDir, []);

  const devDependencies = [
    ...defaultDevDependencies,
    ...preset.devDependencies,
    ceaPackages.expressScripts,
  ];
  console.log(
    '\n📦',
    `Installing ${devDependencies.join(', ')} as devDependencies...\n`,
  );
  await install(preset.packageManager, devDependencies, targetDir, ['-D']);

  // Generate the template files
  const generateTemplate = require(resolveProjectDep(
    '@cszatma/express-scripts/build/generateTemplate',
  )).default;

  logWithSpinner('\n📁', 'Generating project files...\n');
  const options = {
    name: path.basename(targetDir),
    port: preset.port,
    bodyParser: dependencies.includes('body-parser'),
  };
  await generateTemplate(writeTemplate, { options }, targetDir);
  stopSpinner(true);
}
