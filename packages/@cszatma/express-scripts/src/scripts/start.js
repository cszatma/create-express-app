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

const args = process.argv.slice(2);

// Setup useful variables
const includesServer = args.includes('server');
const includesClient = args.includes('client');
const stdio = args.includes('--no-output') ? 'ignore' : 'inherit';

// If no selection is specified start both
const startAll = includesServer === includesClient && plugins.react;
const startServer = startAll || includesServer || !includesClient;
const startClient = startAll || includesClient;

const clientProgram =
  startClient && plugins.react ? require(paths.reactStart) : undefined;

if (startClient && !plugins.react) {
  console.log(
    chalk.red('Error: @cszatma/express-plugin-react is not installed!'),
  );
  process.exit(1);
}

/* Being start process */
console.log(
  `Starting ${chalk.cyan(startServer ? 'server' : '')}${
    startAll ? ' and ' : ''
  }${chalk.cyan(startClient ? 'client' : '')}.\n`,
);

if (startAll) {
  // Run the server and the client
  const serverProgram = serverProgram();
  const concurrently = require.resolve(`${paths.appNodeModules}/concurrently`);
  const args = [
    `"${serverProgram.command} ${serverProgram.args.join(' ')}"`,
    `"cd ${paths.appClient} && ${clientProgram.command} ${clientProgram.args}"`,
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
  const program = serverProgram();
  const result = spawnSync(program.command, program.args, {
    stdio,
    env: process.env,
  });

  checkChildStatus(result.status, 'nodemon');
  console.log(chalk.green(`Finished running the server.\n`));
} else if (startClient) {
  // Run just the client
  const result = spawnSync(clientProgram.command, clientProgram.args, {
    cwd: paths.appClient,
    stdio,
    env: process.env,
  });

  checkChildStatus(result.status, clientProgram.command);
  console.log(chalk.green('Finished running the client.\n'));
}

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
