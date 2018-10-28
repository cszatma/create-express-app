'use strict';

process.env.NODE_ENV = 'development';

process.on('unhandledRejection', err => {
  throw err;
});

const chalk = require('chalk');
const spawnSync = require('child_process').spawnSync;

const paths = require('./utils/paths');
const plugins = require('./utils/getPlugins');
const checkChildStatus = require('./utils/checkChildStatus');
const loadConfig = require('./utils/loadConfig');
const frontEndScripts = require('./utils/frontEndScripts');

const args = process.argv.slice(2);

// Setup useful variables

// Parse args
// @include<front-end>
const includesServer = args.includes('server');
const includesClient = args.includes('client');
// @end-include
const stdio = args.includes('--no-output') ? 'ignore' : 'inherit';

// @include<front-end>
// If no selection is specified start both
const startAll = includesServer === includesClient && loadConfig().frontEnd;
const startServer = startAll || includesServer || !includesClient;
const startClient = startAll || includesClient;

let clientScript;

if (startClient) {
  try {
    clientScript = frontEndScripts().start;
  } catch (e) {
    console.error(chalk.red(e.message));
    process.exit(1);
  }
}
// @end-include

/* Being start process */
// @include<front-end>
console.log(
  `Starting ${chalk.cyan(startServer ? 'server' : '')}${
    startAll ? ' and ' : ''
  }${chalk.cyan(startClient ? 'client' : '')}.\n`,
);
// @else
//# console.log(`Staring ${chalk.cyan('server')}.\n`);
// @end-include

// @include<front-end>
if (startAll) {
  // Run the server and the client
  const program = serverProgram();
  const concurrently = require.resolve(
    `${paths.appNodeModules}/concurrently/bin/concurrently`,
  );
  const args = [
    `"${program.command} ${program.args.join(' ')}"`,
    `"cd ${paths.appClient} && node ${clientScript}"`,
    '--names',
    'Server,Client',
    '-c',
    'red,blue',
  ];
  const result = spawnSync(concurrently, args, { stdio, env: process.env });

  checkChildStatus(result.status, 'concurrently');
  console.log(chalk.green(`Finished running the server and client.\n`));
} else if (startServer) {
  // Run just the server
  // @end-include
  // @trim
  const program = serverProgram();
  const result = spawnSync(program.command, program.args, {
    stdio,
    env: process.env,
  });

  checkChildStatus(result.status, 'nodemon');
  console.log(chalk.green(`Finished running the server.\n`));
  // @end-trim
  // @include<react>
} else if (startClient) {
  // Run just the client
  const result = spawnSync('node', [clientScript], {
    cwd: paths.appClient,
    stdio,
    env: process.env,
  });

  checkChildStatus(result.status, 'node');
  console.log(chalk.green('Finished running the client.\n'));
}
// @end-include

function serverProgram() {
  let customNode;

  if (plugins.babel) {
    customNode = 'babel-node';
  } else if (plugins.typescript) {
    customNode = 'ts-node';
  }

  return {
    command: require.resolve(`${paths.appNodeModules}/nodemon/bin/nodemon`),
    args: [paths.appIndex, ...(customNode ? ['--exec', customNode] : [])],
  };
}
