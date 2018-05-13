import fs from 'fs-extra';
import path from 'path';
import resolve from 'resolve';

import { TemplateOptions } from './parseTemplate';

const replaceRegex = /<%# @replace %>([^]*?)<%# @end %>/g;

export default function generateContent(
  file: string,
  template: string,
  options: TemplateOptions,
): string {
  if (!options.replace) {
    return template;
  }

  // Get the path of the base template
  const extendPath = path.isAbsolute(options.extend)
    ? options.extend
    : resolve.sync(options.extend, { basedir: path.dirname(file) });

  const baseTemplate = fs.readFileSync(extendPath, 'utf-8');

  if (Array.isArray(options.replace)) {
    // Go through the base template and replace each match
    const replaceMatch = template.match(replaceRegex);

    // If no @replace tags are found just return the base template
    if (!replaceMatch) {
      return baseTemplate;
    }

    const replaces = replaceMatch.map(match =>
      match.replace(replaceRegex, '$1').trim(),
    );

    let finalTemplate = baseTemplate;
    options.replace.forEach(
      (replace, index) =>
        (finalTemplate = finalTemplate.replace(replace, replaces[index])),
    );

    return finalTemplate;
  }

  // Replace the single match
  return baseTemplate.replace(options.replace, template);
}
