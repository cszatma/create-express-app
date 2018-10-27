import { spawnSync } from 'child_process';
import path from 'path';

import { Preset } from '../presets';
import PackageJson from '../utils/PackageJson';

export default function setupFrontEnd(preset: Preset, targetDir: string) {
  if (!preset.frontEnd) {
    throw Error('No front end given.');
  }

  const { options } = preset.frontEnd;

  // Create a new front end project
  const result = spawnSync(options.cli, [
    'client',
    ...(options.reactScripts
      ? ['--scripts-version', options.reactScripts]
      : []),
  ]);

  // Make sure front end was created sucessfully
  if (result.status !== 0) {
    throw result.error;
  }

  // Get the client dir and package.json
  const clientDir = path.join(targetDir, 'client');
  const clientPackageJson = new PackageJson(
    require(path.join(clientDir, 'package.json')),
    clientDir,
  );

  // Add proxy field to client package.json to proxy requests to the express server
  clientPackageJson.addField('proxy', {
    '/api/*': { target: `http://localhost:${preset.port}` },
  });

  clientPackageJson.write();
}
