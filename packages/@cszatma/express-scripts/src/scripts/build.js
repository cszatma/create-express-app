'use strict';

process.on('unhandledRejection', err => {
  throw err;
});

const chalk = require('chalk');
const spawnSync = require('child_process').spawnSync;
const fs = require('fs-extra');
const path = require('path');

const paths = require('./utils/paths');
const checkChildStatus = require('./utils/checkChildStatus');
const loadConfig = require('./utils/loadConfig');
const frontEndScripts = require('./utils/frontEndScripts');
const transpilerProgram = require('./utils/transpilerProgram');

const args = process.argv.slice(2);

// Setup useful variables

// Parse args
// @include<front-end>
const includesServer = args.includes('server');
const includesClient = args.includes('client');
// @end-include
const stdio = args.includes('--no-output') ? 'ignore' : 'inherit';

// If no selection is specified build both
// @include<front-end>
const buildAll = includesServer === includesClient && loadConfig().frontEnd;
const buildServer = buildAll || includesServer || !includesClient;
const buildClient = buildAll || includesClient;

let clientScript;

if (buildClient) {
  try {
    clientScript = frontEndScripts().build;
  } catch (e) {
    console.error(chalk.red(e.message));
    process.exit(1);
  }
}
// @end-include

/* Start build process */

console.log(chalk.cyan('Build started.'));

// Make sure the build directory exists and it is empty
fs.ensureDirSync(paths.appBuild);
fs.emptyDirSync(paths.appBuild);

if (buildServer) {
  console.log(`\nBuilding ${chalk.cyan('server')}...\n`);

  if (!transpilerProgram) {
    // If no transpiler just copy files into build directory
    const options = loadConfig().frontEnd && {
      filter: (src, dest) => {
        // Exclude client and test directories
        if (fs.lstatSync(src).isDirectory()) {
          return (
            src.indexOf(loadConfig().frontEnd.dirName) === -1 &&
            src.indexOf('__tests__') === -1
          );
        }
        return true;
      },
    };

    // Copy src files to build directory
    fs.copySync(paths.appSrc, paths.appBuild, options);
  } else {
    // Run transpiler
    const result = spawnSync(
      transpilerProgram.command,
      transpilerProgram.args,
      {
        stdio,
      },
    );

    checkChildStatus(result.status, path.basename(transpilerProgram.command));
    console.log(chalk.green('Successfully built the server!\n'));
  }
}

if (buildClient) {
  console.log(`\nBuilding ${chalk.cyan('client')}...\n`);

  const result = spawnSync('node', [clientScript], {
    cwd: paths.appClient,
    stdio,
    env: process.env,
  });

  checkChildStatus(result.status, 'node');
  console.log(chalk.green('Successfully built the client!\n'));

  // Move the client to the build directory
  console.log(`Moving the built client to ${chalk.cyan(paths.appBuild)}\n`);

  // If keep client specifed copy the build directory, otherwise just move it
  if (args.includes('--keep-client')) {
    fs.ensureDirSync(paths.appBuildClient);
    fs.copySync(paths.appClientBuild, paths.appBuildClient);
  } else {
    fs.moveSync(paths.appClientBuild, paths.appBuildClient);
  }
}

console.log(chalk.green('Build complete!'));
console.log(`Application as available at ${chalk.cyan(paths.appBuild)}\n`);
