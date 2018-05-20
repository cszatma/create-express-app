import { union } from 'lodash';

import { Preset } from '../presets';

export interface Dependencies {
  dependencies: string[];
  devDependencies: string[];
}

export default function flattenPresetDeps(preset: Preset): Dependencies {
  const dependencies = union(
    preset.dependencies,
    preset.transpiler ? preset.transpiler.dependencies : [],
    preset.linter ? preset.linter.dependencies : [],
    preset.frontEnd ? preset.frontEnd.dependencies : [],
  );

  const devDependencies = union(
    preset.devDependencies,
    preset.transpiler ? preset.transpiler.devDependencies : [],
    preset.linter ? preset.linter.devDependencies : [],
    preset.frontEnd ? preset.frontEnd.devDependencies : [],
  );

  return { dependencies, devDependencies };
}

export function combineDependencies(
  allDeps: Dependencies,
  preset: Preset,
): Dependencies {
  const presetDeps = flattenPresetDeps(preset);

  return {
    dependencies: union(allDeps.dependencies, presetDeps.dependencies),
    devDependencies: union(allDeps.devDependencies, presetDeps.devDependencies),
  };
}
