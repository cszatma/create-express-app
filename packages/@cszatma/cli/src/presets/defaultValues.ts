import { yarnExists } from 'node-shared-utils';

export const defaultPackageManager = yarnExists() ? 'yarn' : 'npm';
export const defaultPort = 8000;
