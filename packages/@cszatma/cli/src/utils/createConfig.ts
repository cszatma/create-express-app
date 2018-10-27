import { isEmpty } from 'lodash';
import fs from 'fs-extra';
import path from 'path';

import { Preset } from '../presets';
import createJSFile from './createJSFile';

interface Config {
  frontEnd?: {
    name: string;
    dirName: string;
    reactScripts?: string;
  };
}

export default function createConfig(preset: Preset, targetDir: string) {
  const config: Config = {};

  // Save front end details
  if (preset.frontEnd && preset.frontEnd.options) {
    const frontEnd = preset.frontEnd;
    config.frontEnd = {
      name: frontEnd.name,
      dirName: frontEnd.options.dirName,
    };

    if (frontEnd.options.reactScripts) {
      config.frontEnd.reactScripts = frontEnd.options.reactScripts;
    }
  }

  // If no config, return
  if (isEmpty(config)) {
    return;
  }

  // Write the config file
  fs.writeFileSync(
    path.join(targetDir, 'express-scripts.config.js'),
    createJSFile(config),
  );
}
