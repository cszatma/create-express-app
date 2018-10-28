'use strict';

process.on('unhandledRejection', err => {
  throw err;
});

const chalk = require('chalk');
const fs = require('fs-extra');

const paths = require('./utils/paths');
const loadConfig = require('./utils/loadConfig');

const args = process.argv.slice(2);

// Setup useful variables

// Parse args
// @include<front-end>
const includesServer = args.includes('server');
const includesClient = args.includes('client');
// @end-include

// If no selection is specified clean both
// @include<front-end>
const cleanAll = includesServer === includesClient && loadConfig().frontEnd;
const cleanServer = cleanAll || includesServer || !includesClient;
const cleanClient = cleanAll || includesClient;

/* Start clean process */

console.log(chalk.cyan('Cleaning build files.'));

if (cleanServer) {
  if (fs.existsSync(paths.appBuild)) {
    fs.removeSync(paths.appBuild);
  }
}

if (cleanClient) {
  if (fs.existsSync(paths.appClientBuild)) {
    fs.removeSync(paths.appClientBuild);
  }
}

console.log(chalk.green('Clean complete!'));
