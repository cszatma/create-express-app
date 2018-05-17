import path from 'path';

const packagesDir = path.join(__dirname, '../../../../');

export const resolveLocal = (packageName: string) =>
  path.resolve(packagesDir, packageName);

export const resolveProjectDep = (packageName: string) =>
  path.resolve(process.cwd(), 'node_modules', packageName);

export default function getPackages() {
  const packages: { [key: string]: string } = {
    expressScripts: '@cszatma/express-scripts',
    linter: '@cszatma/express-plugin-linter',
    typescript: '@cszatma/express-plugin-typescript',
    sharedUtils: 'node-shared-utils',
  };

  if (process.env.CREATE_EXPRESS_APP_TEST) {
    Object.keys(packages).forEach(
      key => (packages[key] = `file:${resolveLocal(packages[key])}`),
    );
  }

  return packages;
}
