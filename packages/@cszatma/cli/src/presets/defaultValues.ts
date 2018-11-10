import { yarnExists, gitExists } from '@cszatma/cli-shared-utils';

export const defaultPackageManager = yarnExists() ? 'yarn' : 'npm';
export const defaultPort = 8000;
export const lintOnCommit = gitExists();
