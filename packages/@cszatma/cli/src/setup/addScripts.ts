import PackageJson from '../utils/PackageJson';
import { Preset } from '../presets';

const installScripts = (packageManager: string, clientDir: string) => ({
  'install:client': `${
    packageManager === 'yarn' ? 'yarn --cwd' : 'npm --prefix'
  } ${clientDir} install`,
  postinstall: `${packageManager} run install:client`,
});

export default function addScripts(
  packageJson: PackageJson,
  preset: Preset,
): void {
  const requiresBuild = !!preset.transpiler && !!preset.frontEnd;
  packageJson.extendScripts({
    ...(requiresBuild ? { build: 'express-scripts build' } : {}),
    dev: 'express-scripts start',
    ...(requiresBuild ? { clean: 'express-scripts clean' } : {}),
    eject: 'express-scripts eject',
    start: `node ${requiresBuild ? 'build' : 'src'}/index.js`,
    ...(preset.frontEnd
      ? installScripts(preset.packageManager, preset.frontEnd.options.dirName)
      : {}),
  });
}
