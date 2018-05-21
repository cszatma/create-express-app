export default (hasFrontEnd: boolean): any => ({
  compilerOptions: {
    module: 'commonjs',
    target: 'es6',
    lib: ['es6'],
    esModuleInterop: true,
    allowSyntheticDefaultImports: true,
    moduleResolution: 'node',
    rootDir: 'src',
    outDir: 'build',
    strict: true,
    forceConsistentCasingInFileNames: true,
    suppressImplicitAnyIndexErrors: true,
    baseUrl: '.',
    paths: {
      '*': ['node_modules/*', 'src/types/*'],
      '@/*': ['src/*'],
    },
  },
  include: ['src/**/*'],
  exclude: ['node_modules', 'build', ...(hasFrontEnd ? ['client'] : [])],
});
