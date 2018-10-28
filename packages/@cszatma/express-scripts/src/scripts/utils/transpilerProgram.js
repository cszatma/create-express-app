'use strict';

const paths = require('./paths');
const plugins = require('./getPlugins');

let transpilerProgram;

if (plugins.typescript) {
  transpilerProgram = {
    command: require.resolve('typescript/bin/tsc'),
    args: ['-p', paths.appTsBuildConfig],
  };
} else if (plugins.babel) {
  transpilerProgram = {
    command: require.resolve('@babel/cli/bin/babel'),
    args: [paths.appSrc, '-d', paths.appBuild],
  };
}

module.exports = transpilerProgram;
