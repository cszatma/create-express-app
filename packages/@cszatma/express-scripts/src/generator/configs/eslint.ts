export default (usePrettier?: boolean): any => ({
  env: {
    node: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    ...(usePrettier ? ['plugin:prettier/recommended'] : []),
  ],
  rules: {
    'no-console': 'off',
  },
});
