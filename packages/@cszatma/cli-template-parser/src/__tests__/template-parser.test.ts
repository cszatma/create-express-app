import 'jest';

import render, { getFileName } from '../index';

const mainTemplate = require.resolve('./main.ts.tmpl');
const extendTemplate = require.resolve('./extend.ts.tmpl');

describe('template-parser tests', () => {
  it('should return `index.js` as the file name', () => {
    expect(getFileName('index.js.tmpl')).toBe('index.js');
    expect(getFileName('index.js')).toBe('index.js');
  });

  it('should render the main template with the else block', () => {
    expect(render(mainTemplate)).toBe(
      "const name = 'main template';\n\n" +
        "console.log('name of the file is ' + name);\n\n" +
        "console.log('not using react');\n",
    );
  });

  it('should render the main template with the if block', () => {
    expect(render(mainTemplate, { react: true })).toBe(
      "const name = 'main template';\n\n" +
        "console.log('name of the file is ' + name);\n\n" +
        "console.log('using react');\n",
    );
  });

  it('should extend the main template', () => {
    expect(render(extendTemplate)).toBe(
      "const name = 'test template ftw!!!';\n\n" +
        "console.log('name of the file is ' + name);\n\n" +
        "console.log('not using react');\n",
    );
  });
});

console.log(render(require.resolve('./main.ts.tmpl')));
const file = render(require.resolve('./extend.ts.tmpl'), {
  react: true,
});
console.log(file);
