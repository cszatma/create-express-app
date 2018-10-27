import PackageJson from '../utils/PackageJson';

export default function addScripts(
  packageJson: PackageJson,
  requiresBuild: boolean,
): void {
  packageJson.extendScripts({
    ...(requiresBuild ? { build: 'express-scripts build' } : {}),
    dev: 'express-scripts start',
    eject: 'express-scripts eject',
    start: `node ${requiresBuild ? 'build' : 'src'}/index.js`,
  });
}
