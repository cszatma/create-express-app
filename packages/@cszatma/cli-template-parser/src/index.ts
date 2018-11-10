import ejs from 'ejs';
import fs from 'fs-extra';
import path from 'path';

import generateContent from './generateContent';
import parseTemplate from './parseTemplate';

export default function render(file: string, data: any = {}): string {
  const template = fs.readFileSync(file, 'utf-8');

  const { content, options } = parseTemplate(template);

  const templateContent =
    options && options.extend
      ? generateContent(file, content, options)
      : content + '\n';

  return ejs.render(templateContent, data);
}

export function getFileName(templateName: string): string {
  const extensionIndex = templateName.lastIndexOf('.');
  const extension = templateName.substring(extensionIndex + 1);

  // If the file extension is .tmpl remove the it, otherwise return the file name
  if (extension === 'tmpl') {
    return templateName.substring(0, extensionIndex);
  } else {
    return templateName;
  }
}

export function writeTemplate(
  template: string,
  outputFile: string,
  data: any = {},
): void {
  const output = getFileName(outputFile);
  fs.ensureDirSync(path.dirname(output));
  fs.writeFileSync(output, render(template, data));
}

export { Template, TemplateOptions } from './parseTemplate';
