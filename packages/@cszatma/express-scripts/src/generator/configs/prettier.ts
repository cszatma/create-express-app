export default (parser?: string): any => ({
  parser: parser === 'typescript' ? 'typescript' : 'babylon',
  trailingComma: 'all',
  singleQuote: true,
  tabWidth: 2,
});
