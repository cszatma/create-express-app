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

  // Go through each template file and render it using the supplied function
  files.forEach(file => {
    const template = path.resolve(templateDir, file);
    const outputFile = path.resolve(targetDir, file);
    render(template, outputFile, data);
  });

  // Rename gitignore to .gitignore
  const gitignorePath = path.join(targetDir, 'gitignore');
  // tslint:disable-next-line:variable-name
  const _gitignorePath = path.join(targetDir, '.gitignore');

  // Check if .gitignore already exists
  // If yes, append gitignore to it
  if (fs.existsSync(_gitignorePath)) {
    const gitignoreData = fs.readFileSync(gitignorePath);
    fs.appendFileSync(_gitignorePath, gitignoreData);
    fs.unlinkSync(gitignorePath);
  } else {
    fs.moveSync(gitignorePath, _gitignorePath);
  }
}
