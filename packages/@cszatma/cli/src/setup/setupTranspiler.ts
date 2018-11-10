import path from 'path';
import fs from 'fs-extra';
import { writeTemplate } from '@cszatma/cli-template-parser';

import { resolveProjectDep } from '../utils/getPackages';
import { Preset, Transpiler } from '../presets';

export default async function setupTranspiler(
  preset: Preset,
  targetDir: string,
  data: any = {},
): Promise<void> {
  switch (preset.transpiler!.name as Transpiler) {
    case 'babel':
      return setupBabel(preset, targetDir, data);
    case 'typescript':
      return setupTypescript(preset, targetDir, data);
  }

  throw Error(`Unknown transpiler ${preset.transpiler}.`);
}

function setupBabel(preset: Preset, targetDir: string, data: any) {
  // TODO setup babel
}

async function setupTypescript(preset: Preset, targetDir: string, data: any) {
  const generateTemplate = require(resolveProjectDep(
    '@cszatma/express-plugin-typescript/build/generateTemplate',
  )).default;

  await generateTemplate(writeTemplate, data, targetDir);

  const setupConfigs = require(resolveProjectDep(
    '@cszatma/express-plugin-typescript/build/setupConfigs',
  )).default;

  // Get tsconfig
  const { tsconfig, tsconfigBuild } = setupConfigs({
    tsconfig: true,
    hasFrontEnd: !!preset.frontEnd,
  });

  // Write the tsconfig.json
  fs.writeFileSync(
    path.join(targetDir, 'tsconfig.json'),
    JSON.stringify(tsconfig, null, 2),
  );

  // Write the tsconfig.build.json
  fs.writeFileSync(
    path.join(targetDir, 'tsconfig.build.json'),
    JSON.stringify(tsconfigBuild, null, 2),
  );
}
