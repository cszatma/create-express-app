const fs = require('fs');
const path = require('path');

// Resolve paths relative to the root project directory
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = resolveApp;
