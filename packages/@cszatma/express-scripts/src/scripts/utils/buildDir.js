const fs = require('fs-extra');

const resolveApp = require('./resolveApp');

const tsconfigPath = resolveApp('tsconfig.json');

// Return outDir specified in tsconfig.json if it exists, otherwise use build
module.exports = fs.existsSync(tsconfigPath)
  ? require(tsconfigPath).compilerOptions.outDir
  : 'build';
