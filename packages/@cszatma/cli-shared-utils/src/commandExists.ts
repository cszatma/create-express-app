import { spawnSync } from 'child_process';

export function commandExists(command: string): boolean {
  try {
    spawnSync(`${command} --version`, { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
}

let hasYarn: boolean;
let hasGit: boolean;

export function yarnExists(): boolean {
  if (hasYarn) {
    return true;
  }

  return (hasYarn = commandExists('yarn'));
}

export function gitExists(): boolean {
  if (hasGit) {
    return hasGit;
  }

  return (hasGit = commandExists('git'));
}
