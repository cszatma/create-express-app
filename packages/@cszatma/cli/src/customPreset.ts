import { CUSTOM_PRESET_KEY, Preset } from './presets';
import packageManagerPrompt from './prompts/packageManager';
import portPrompt from './prompts/port';
import transpilerPrompt from './prompts/transpiler';
import linterPrompt from './prompts/linter';
import frontEndPrompt from './prompts/frontEnd';
import extraPackagesPrompt from './prompts/extraPackages';
import savePresetPrompt from './prompts/savePreset';
import { savePreset } from './options';

export default async function customPreset(useNpm: boolean): Promise<Preset> {
  const packageManager = useNpm ? 'npm' : await packageManagerPrompt();
  const port = await portPrompt();
  const transpiler = await transpilerPrompt();

  const usingTypescript =
    transpiler !== undefined && transpiler.name === 'typescript';

  const linter = await linterPrompt(usingTypescript);
  const frontEnd = await frontEndPrompt();
  const extraPackages = await extraPackagesPrompt(usingTypescript);
  const presetName = await savePresetPrompt();

  const preset = {
    name: presetName || CUSTOM_PRESET_KEY,
    packageManager,
    port,
    transpiler,
    linter,
    frontEnd,
    dependencies: extraPackages.dependencies,
    devDependencies: extraPackages.devDependencies,
  };

  if (presetName) {
    savePreset(preset);
  }

  return preset;
}
