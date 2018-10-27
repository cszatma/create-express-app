import { isEmpty } from 'lodash';
import fs from 'fs-extra';
import path from 'path';

import { Preset } from '../presets';
import createJSFile from './createJSFile';

interface Config {
  frontEnd?: {
    name: string;
    reactScripts?: string;
  };
}

export default function createConfig(preset: Preset, targetDir: string) {
  const config: Config = {};

  // Save front end details
  if (preset.frontEnd) {
    config.frontEnd = {
      name: preset.frontEnd.name,
    };

    if (preset.frontEnd.options && preset.frontEnd.options.reactScripts) {
      config.frontEnd.reactScripts = preset.frontEnd.options.reactScripts;
    }
  }

  // If no config, return
  if (isEmpty(config)) {
    return;
  }

  // Write the config file
  fs.writeFileSync(path.join(targetDir, 'cea.config.js'), createJSFile(config));
}
