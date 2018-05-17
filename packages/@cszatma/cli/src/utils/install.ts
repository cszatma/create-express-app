import { spawn } from 'child_process';

import { PackageManager } from '../prompts/packageManager';

export default async function install(
  packageManager: PackageManager,
  dependencies: string[],
  dir: string,
  flags: string[],
): Promise<void> {
  const args =
    packageManager === 'yarn'
      ? ['add', ...dependencies, ...flags, '--cwd', dir]
      : ['install', ...dependencies, '--save', ...flags];

  return new Promise<void>((resolve, reject) => {
    const child = spawn(packageManager, args, { stdio: 'inherit' });
    child.on('close', code => {
      if (code !== 0) {
        return reject({ command: `${packageManager} ${args.join(' ')}` });
      }

      resolve();
    });
  });
}
