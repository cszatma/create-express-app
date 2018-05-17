import path from 'path';
import globby from 'globby';

export default async function generateTemplate(
  render: (file: string, output: string, data: any) => void,
  data: any,
  targetDir: string,
): Promise<void> {
  const templateDir = path.resolve(__dirname, 'template');
  const files = await globby('**/*', { cwd: templateDir });

  files.forEach(file => {
    const template = path.resolve(templateDir, file);
    const outputFile = path.resolve(targetDir, file);
    render(template, outputFile, data);
  });
}
