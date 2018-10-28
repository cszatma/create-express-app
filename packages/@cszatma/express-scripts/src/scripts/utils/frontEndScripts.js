'use strict';
const path = require('path');

const paths = require('./paths');
const loadConfig = require('./loadConfig');

module.exports = () => {
  const frontEnd = loadConfig().frontEnd;

  // Check to see if a front end is specified in the config
  if (!frontEnd) {
    return undefined;
  }

  const clientPackagesDir = path.resolve(paths.appClient, 'node_modules');
  if (frontEnd.name === 'react') {
    const scriptsName = frontEnd.reactScripts || 'react-scripts';
    const scriptsPath = path.resolve(clientPackagesDir, scriptsName, 'scripts');
    return {
      start: `${scriptsPath}/start`,
      build: `${scriptsPath}/build`,
    };
  } else {
    throw new Error(`Unsupported front end ${frontEnd.name}`);
  }
};

// if scripts -> scriptsConfig else check reactscripts else find react-scripts
