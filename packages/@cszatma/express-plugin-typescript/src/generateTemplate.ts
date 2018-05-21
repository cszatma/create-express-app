import path from 'path';
import globby from 'globby';
import fs from 'fs-extra';

export default async function generateTemplate(
  render: (file: string, output: string, data: any) => void,
  data: any,
  targetDir: string,
): Promise<void> {
  const templateDir = path.resolve(__dirname, 'template');
  const files = await globby('**/*', { cwd: templateDir });

  // Remove previously generated files in the src directory
  fs.emptyDirSync(path.resolve(targetDir, 'src'));

  // Go through each template file and render it using the supplied function
  files.forEach(file => {
    const template = path.resolve(templateDir, file);
    const outputFile = path.resolve(targetDir, file);
    render(template, outputFile, data);
  });
}
