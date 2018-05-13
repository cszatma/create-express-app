import chalk from 'chalk';
import path from 'path';
import fs from 'fs-extra';
import { logWithSpinner, stopSpinner, gitExists } from 'node-shared-utils';
import { execSync } from 'child_process';

import checkAppName from './utils/checkAppName';
import createFromPreset from './setup/createFromPreset';
import packageManagerPrompt from './prompts/packageManager';
import choosePresetPrompt from './prompts/choosePreset';

interface Options {
  force: boolean;
  useNpm: boolean;
  noGit: boolean;
}

export default async function create(projectName: string, options: Options) {
  const targetDir = path.resolve(projectName);
  checkAppName(projectName);

  if (options.force) {
    // Empty the directory if it exists or create it
    fs.emptyDirSync(targetDir);
  } else {
    fs.ensureDirSync(targetDir);
  }

  // Start creation
  const packageJson = {
    name: projectName,
    version: '0.1.0',
    private: true,
  };

  const originalDirectory = process.cwd();
  process.chdir(targetDir);

  if (!options.noGit && gitExists) {
    logWithSpinner(`🗃`, `Initializing git repository...`);
    execSync('git init');
  }

  stopSpinner(true);
  const preset = await choosePresetPrompt();

  if (preset === 'custom') {
    const packageManager = options.useNpm
      ? 'npm'
      : await packageManagerPrompt();
    // const prompts = ['transpiler', 'linter', 'frontEnd', 'extraPackages'].map(
    //   file => require(`./prompts/${file}`),
    // );
  } else {
    logWithSpinner(
      '⚒️🚧',
      `Creating new Express app in ${chalk.cyan(
        targetDir,
      )} with the ${chalk.cyan(preset.name)} preset.\n`,
    );

    createFromPreset(preset, packageJson);
  }
}
