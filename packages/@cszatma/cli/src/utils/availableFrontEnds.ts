import { commandExists } from 'node-shared-utils';

export interface FrontEnds {
  [key: string]: string;
}

let frontEnds: FrontEnds;

export default function availableFrontEnds(): FrontEnds {
  if (frontEnds !== undefined) {
    return frontEnds;
  }

  frontEnds = {};

  if (commandExists('create-react-app')) {
    frontEnds.react = 'create-react-app';
  }

  return frontEnds;
}
