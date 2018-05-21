import merge from 'deepmerge';
import fs from 'fs-extra';
import path from 'path';

import { copyValue, isArray, isFunction, isObject } from './typeCheckers';
import { PackageManager } from '../presets';
import install from './install';

export default class PackageJson {
  private packageJson: any;
  private readonly directory: string;
  private readonly path: string;

  constructor(packageJson: any, directory: string) {
    this.packageJson = packageJson;
    this.directory = directory;
    this.path = path.join(directory, 'package.json');
  }

  // Extend the package.json using parts of another package.json
  public extend(fields: any): void {
    const pkg = this.packageJson;
    const toMerge = isFunction(fields) ? fields(pkg) : fields;

    // Go through each key in the supplied object and merge it appropriately
    Object.keys(toMerge).forEach(key => {
      // If it is an object do a deep clone to prevent unintended mutation
      const value = copyValue(toMerge[key]);
      const existingValue = pkg[key];

      if (!(key in pkg)) {
        pkg[key] = value;
      } else if (isArray(value) && isArray(existingValue)) {
        pkg[key] = existingValue.concat(value);
      } else if (isObject(value) && isObject(existingValue)) {
        pkg[key] = merge(existingValue, value);
      } else {
        pkg[key] = value;
      }
    });
  }

  public addField(name: string, value: any): void {
    // If the field doesn't exist just add it
    if (!(name in this.packageJson)) {
      this.packageJson[name] = copyValue(value);
    } else {
      this.extend({ [name]: value });
    }
  }

  public getField(key: string): any {
    return this.packageJson[key];
  }

  public async install(
    packageManager: PackageManager,
    dependencies: string[],
    flags: string[] = [],
  ): Promise<void> {
    this.write();

    // Install dependencies then update the package.json in memory
    await install(packageManager, dependencies, this.directory, flags);
    this.packageJson = fs.readJSONSync(this.path);
  }

  public write(targetDir?: string): void {
    const pkgPath = targetDir
      ? path.join(targetDir, 'package.json')
      : this.path;

    fs.writeJSONSync(pkgPath, this.packageJson, { spaces: 2 });
  }

  public toString(spacing: number = 2): string {
    return JSON.stringify(this.packageJson, null, spacing);
  }
}
