'use strict';

const fs = require('fs');
const path = require('path');

const appDirectory = fs.realpathSync(process.cwd());
const pkgJson = require(path.resolve(appDirectory, 'package.json'));

const availablePlugins = [
  '@cszatma/express-plugin-babel',
  '@cszatma/express-plugin-typescript',
  '@cszatma/express-plugin-react',
];

let plugins;

function getPlugins() {
  if (plugins) {
    return plugins;
  }

  // Find all the plugins used
  const devDependencies = pkgJson.devDependencies;
  const usedPlugins = availablePlugins.filter(
    plugin => plugin in devDependencies,
  );

  return {
    babel: usedPlugins.includes('@cszatma/express-plugin-babel'),
    typescript: usedPlugins.includes('@cszatma/express-plugin-typescript'),
    react: usedPlugins.includes('@cszatma/express-plugin-react'),
  };
}

module.exports = getPlugins();
