'use strict';

const fs = require('fs');
const path = require('path');

const plugins = require('./getPlugins');

// Resolve paths relative to the root project directory
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

// @remove-eject
const resolvePluginPaths = plugin =>
  resolveApp(
    `node_modules/@cszatma/express-plugin-${plugin}/build/scripts/utils/paths`,
  );
const pluginPaths = {
  ...(plugins.babel ? require(resolvePluginPaths('babel')) : {}),
  ...(plugins.typescript ? require(resolvePluginPaths('typescript')) : {}),
  ...(plugins.react ? require(resolvePluginPaths('react')) : {}),
};
// @end-remove-eject

module.exports = {
  appBuild: resolveApp('build'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  appIndex: resolveApp('src/index'),
  appNodeModules: resolveApp('node_modules'),
  yarnLockFile: resolveApp('yarn.lock'),
  // @include<typescript>
  appTsBuildConfig: resolveApp('tsconfig.build.json'),
  appTsConfig: resolveApp('tsconfig.json'),
  // @end-include
  // @include<react>
  appBuildClient: resolveApp('build/client'),
  appClient: resolveApp('client'),
  appClientBuild: resolveApp('client/build'),
  clientPackageJson: resolveApp('client/package.json'),
  // @end-include
  // @remove-eject
  ...pluginPaths,
  // @end-remove-eject
};
