export default (usePrettier: boolean): any => ({
  defaultSeverity: 'error',
  extends: [
    'tslint:recommended',
    ...(usePrettier ? ['tslint-config-prettier'] : []),
  ],
  rules: {
    ...(usePrettier ? { prettier: true } : {}),
    'array-type': false,
    'no-console': false,
    'no-var-requires': false,
    'interface-name': [true, 'never-prefix'],
    'object-literal-sort-keys': false,
    'ordered-imports': false,
  },
  ...(usePrettier ? { rulesDirectory: ['tslint-plugin-prettier'] } : {}),
});
