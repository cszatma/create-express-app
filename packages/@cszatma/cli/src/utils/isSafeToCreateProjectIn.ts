import fs from 'fs-extra';
import chalk from 'chalk';

export default function isSafeToCreateProjectIn(
  rootPath: string,
  dirName: string,
): boolean {
  const validFiles = [
    '.DS_Store',
    'Thumbs.db',
    '.git',
    '.gitignore',
    '.idea',
    'README.md',
    'LICENSE',
    'web.iml',
    '.hg',
    '.hgignore',
    '.hgcheck',
    '.npmignore',
    'mkdocs.yml',
    'docs',
    '.travis.yml',
    '.gitlab-ci.yml',
    '.gitattributes',
  ];

  const conflicts = fs
    .readdirSync(rootPath)
    .filter(file => !validFiles.includes(file));

  if (conflicts.length < 1) {
    return true;
  }

  console.log(
    `The directory ${chalk.cyan(
      dirName,
    )} contains files that could conflict:\n`,
  );

  conflicts.forEach(conflict => console.log(`  ${conflict}`));

  console.log(
    '\nEither use a different project name or remove the files listed above.',
  );

  return false;
}
