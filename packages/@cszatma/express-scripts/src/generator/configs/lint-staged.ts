export interface LintStagedOptions {
  eslint: boolean;
  tslint: boolean;
  prettier: boolean;
  typescript: boolean;
  frontEnd: boolean;
}

export default (options: LintStagedOptions): any => {
  let linters;

  if (options.eslint) {
    linters = {
      '*.js': ['eslint --fix', 'git add'],
    };
  } else if (options.tslint) {
    linters = {
      '*.ts': [
        'tslint -c ./tslint.json -p ./tsconfig.json --fix'.concat(
          options.frontEnd ? ' -e client/**/*' : '',
        ),
        'git add',
      ],
      ...(options.prettier ? { '*.js': ['prettier --write', 'git add'] } : {}),
    };
  } else if (options.prettier) {
    const key = options.typescript ? '*.{ts,js}' : '*.js';
    linters = {
      [key]: ['prettier --write', 'git add'],
    };
  } else {
    throw new Error('No linter/formatter provided.');
  }

  return {
    linters,
    ...(options.frontEnd ? { ignore: ['client/'] } : {}),
  };
};
