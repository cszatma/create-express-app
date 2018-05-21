import PackageJson from '../utils/PackageJson';

export default function addScripts(
  packageJson: PackageJson,
  hasTranspiler: boolean,
): void {
  packageJson.extendScripts({
    ...(hasTranspiler ? { build: 'express-scripts build' } : {}),
    dev: 'express-scripts start',
    eject: 'express-scripts eject',
    start: `node ${hasTranspiler ? 'build' : 'src'}/index.js`,
  });
}
