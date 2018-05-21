import { execSync } from 'child_process';

import PackageJson from '../utils/PackageJson';
import { PackageManager } from '../presets';

export default function addEngines(
  packageJson: PackageJson,
  packageManager: PackageManager,
): void {
  const packageManagerVersion = execSync(`${packageManager} --version`);

  packageJson.addField('engines', {
    node: process.versions.node,
    [packageManager]: packageManagerVersion.toString().trim(),
  });
}
