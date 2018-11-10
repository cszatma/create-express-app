import chalk from 'chalk';
import path from 'path';
import fs from 'fs-extra';
import {
  logWithSpinner,
  stopSpinner,
  gitExists,
  logError,
  logSuccess,
  exitFailure,
} from '@cszatma/cli-shared-utils';
import { execSync } from 'child_process';

import checkAppName from './utils/checkAppName';
import isSafeToCreateProjectIn from './utils/isSafeToCreateProjectIn';
import createFromPreset from './setup/createFromPreset';
import choosePresetPrompt from './prompts/choosePreset';
import customPreset from './customPreset';
import { loadOptions } from './options';
import { CUSTOM_PRESET_KEY } from './presets';
import PackageJson from './utils/PackageJson';
import cleanUpFiles from './utils/cleanUpFiles';

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
      return exitFailure(
        `Error: A directory named ${projectName} already exists and it is not safe to overwrite.\n`,
      );
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

  // Remove files if the program receives an interrupt signal
  process.on('SIGINT', () => {
    cleanUpFiles(originalDirectory, targetDir);
    process.exit(130);
  });

  try {
    // Create a git repo unless specified not to
    const useGit = !options.noGit && gitExists;
    if (useGit) {
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
      `Creating new Express app in ${chalk.cyan(
        targetDir,
      )} with the ${chalk.cyan(preset.name)} preset.\n`,
    );

    await createFromPreset(preset, packageJson, targetDir);

    if (useGit) {
      execSync('git add --all');
      execSync('git commit -m "Initial commit"');
    }

    logSuccess(`✅  Successfully created ${projectName}. Enjoy!\n`);
  } catch (error) {
    if (error.message) {
      logError(error.message);
    }

    logError(
      '❌  Failed to create app. Please resolve errors and try again.\n',
    );
    // If an error occurs cleanup any generated files.
    cleanUpFiles(originalDirectory, targetDir);

    process.exit(1);
  }
}
