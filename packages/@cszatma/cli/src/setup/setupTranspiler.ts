import { exitFailure } from 'node-shared-utils';
import { writeTemplate } from 'js-template-parser';

import { resolveProjectDep } from '../utils/getPackages';
import { Plugin, Transpiler } from '../presets';

export default async function setupTranspiler(
  transpiler: Plugin,
  targetDir: string,
  data: any = {},
): Promise<void> {
  switch (transpiler.name as Transpiler) {
    case 'babel':
      return setupBabel(transpiler, targetDir, data);
    case 'typescript':
      return setupTypescript(transpiler, targetDir, data);
  }

  exitFailure(`Unknown transpiler ${transpiler}.`);
}

function setupBabel(transpiler: Plugin, targetDir: string, data: any) {
  // TODO setup babel
}

async function setupTypescript(
  transpiler: Plugin,
  targetDir: string,
  data: any,
) {
  const generateTemplate = require(resolveProjectDep(
    '@cszatma/express-plugin-typescript/build/generateTemplate',
  )).default;

  await generateTemplate(writeTemplate, data, targetDir);
}
