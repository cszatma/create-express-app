'use strict';

const fs = require('fs');
const path = require('path');

const typescriptDirectory = path.resolve(
  fs.realpathSync(process.cwd()),
  'node_modules',
  '@cszatma/express-plugin-typescript',
);
const resolveTypescript = relativePath =>
  path.resolve(typescriptDirectory, relativePath);

module.exports = {};
