'use strict';

const path = require('path');

const resolveOwn = relativePath => path.resolve(__dirname, '..', relativePath);

module.exports = {
  typescriptBuildScript: resolveOwn('build'),
  typescriptStartScript: resolveOwn('start'),
  typescriptEjectScript: resolveOwn('eject'),
};
