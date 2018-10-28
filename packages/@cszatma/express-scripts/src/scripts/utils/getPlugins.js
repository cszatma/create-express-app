'use strict';

const fs = require('fs');
const path = require('path');

const appDirectory = fs.realpathSync(process.cwd());
const pkgJson = require(path.resolve(appDirectory, 'package.json'));

const BABEL = '@cszatma/express-plugin-babel';
const TYPESCRIPT = '@cszatma/express-plugin-typescript';

const availablePlugins = [BABEL, TYPESCRIPT];

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
    babel: usedPlugins.includes(BABEL),
    typescript: usedPlugins.includes(TYPESCRIPT),
  };
}

module.exports = getPlugins();
