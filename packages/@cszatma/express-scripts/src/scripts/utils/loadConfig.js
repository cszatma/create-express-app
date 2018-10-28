'use strict';

const fs = require('fs');

const resolveApp = require('./resolveApp');

// Cache config so it doesn't need to be refetched
let config = undefined;

module.exports = () => {
  // If config has already been fetched, return it
  if (config) {
    return config;
  }

  const configPath = resolveApp('express-scripts.config.js');
  const configKey = 'expressScriptsConfig';
  const packageJson = require(resolveApp('package.json'));
  // Get config if it exists, or set to null
  if (fs.existsSync(configPath)) {
    config = require(configPath);
  } else if (configKey in packageJson) {
    // Get from package.json
    config = packageJson[configKey];
  } else {
    config = {};
  }

  return config;
};
