import chalk from 'chalk';
import path from 'path';
import fs from 'fs-extra';
import { logWithSpinner, stopSpinner, gitExists } from 'node-shared-utils';
import { execSync } from 'child_process';

import checkAppName from './utils/checkAppName';
import isSafeToCreateProjectIn from './utils/isSafeToCreateProjectIn';
import createFromPreset from './setup/createFromPreset';
import choosePresetPrompt from './prompts/choosePreset';
import customPreset from './customPreset';
import { loadOptions } from './options';
import { CUSTOM_PRESET_KEY } from './presets';
import PackageJson from './utils/packageJson';

interface CliOptions {
  force: boolean;
  useNpm: boolean;
  noGit: boolean;
}

export default async function create(projectName: string, options: CliOptions) {
  const targetDir = path.resolve(projectName);
  checkAppName(projectName);

  if (options.force) {
    // Empty the directory if it exists or create it
    fs.emptyDirSync(targetDir);
  } else {
    fs.ensureDirSync(targetDir);
    if (!isSafeToCreateProjectIn(targetDir, projectName)) {
      return process.exit(1);
    }
  }

  // Start creation

  // Create package.json
  const packageJson = new PackageJson(
    {
      name: projectName,
      version: '0.1.0',
      private: true,
    },
    targetDir,
  );

  // Save directory cli was executed from and change into project directory
  const originalDirectory = process.cwd();
  process.chdir(targetDir);

  // Create a git repo unless specified not to
  if (!options.noGit && gitExists) {
    logWithSpinner(`🗃`, `Initializing git repository...`);
    execSync('git init');
  }

  stopSpinner(true);

  loadOptions();

  const presetAnswer = await choosePresetPrompt();
  const preset =
    presetAnswer === CUSTOM_PRESET_KEY
      ? await customPreset(options.useNpm)
      : presetAnswer;

  logWithSpinner(
    '⚒️🚧',
    `Creating new Express app in ${chalk.cyan(targetDir)} with the ${chalk.cyan(
      preset.name,
    )} preset.\n`,
  );

  await createFromPreset(preset, packageJson, targetDir);
}
