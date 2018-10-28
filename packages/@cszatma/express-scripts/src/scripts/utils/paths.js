'use strict';

const buildDir = require('./buildDir');
const loadConfig = require('./loadConfig');
const resolveApp = require('./resolveApp');

// @include<front-end>
const config = loadConfig();
const clientDir = config.frontEnd ? config.frontEnd.dirName : undefined;
const clientPaths = clientDir
  ? {
      appBuildClient: resolveApp(`${buildDir}/${clientDir}`),
      appClient: resolveApp(clientDir),
      appClientBuild: resolveApp(`${clientDir}/build`),
      clientPackageJson: resolveApp(`${clientDir}/package.json`),
    }
  : {};
// @include<front-end>

module.exports = {
  appBuild: resolveApp(buildDir),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  appIndex: resolveApp('src/index'),
  appNodeModules: resolveApp('node_modules'),
  yarnLockFile: resolveApp('yarn.lock'),
  // @include<typescript>
  appTsBuildConfig: resolveApp('tsconfig.build.json'),
  appTsConfig: resolveApp('tsconfig.json'),
  // @end-include
  // @include<front-end>
  ...clientPaths,
  // @end-include
  expressScriptsConfig: resolveApp('express-scripts.config.js'),
};
