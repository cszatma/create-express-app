import fs from 'fs-extra';

export default function cleanUpFiles(originalDir: string, targetDir: string) {
  process.chdir(originalDir);
  fs.removeSync(targetDir);
}
