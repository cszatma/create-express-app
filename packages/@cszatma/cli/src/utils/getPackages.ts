import path from 'path';

const packagesDir = path.join(__dirname, '../../../../');

// Resolve other packages in the repo when running locally
export const resolveLocal = (packageName: string) =>
  path.resolve(packagesDir, packageName);

// Resolve the project's dependency rather than the cli's
export const resolveProjectDep = (packageName: string) =>
  path.resolve(process.cwd(), 'node_modules', packageName);

export interface CEAPackages {
  expressScripts: string;
  babel: string;
  typescript: string;
  react: string;
  sharedUtils: string;
  [key: string]: string;
}

let packages: CEAPackages;

export default function getPackages() {
  // Cache packages to quickly return them later
  if (packages) {
    return packages;
  }

  // Initialize all packages
  packages = {
    expressScripts: '@cszatma/express-scripts',
    babel: '@cszatma/express-plugin-babel',
    typescript: '@cszatma/express-plugin-typescript',
    react: '@cszatma/express-plugin-react',
    sharedUtils: 'node-shared-utils',
  };

  // CLI is being run locally, replace all the packages with local paths
  if (process.env.CREATE_EXPRESS_APP_TEST) {
    Object.keys(packages).forEach(
      key => (packages[key] = `file:${resolveLocal(packages[key])}`),
    );
  }

  return packages;
}
