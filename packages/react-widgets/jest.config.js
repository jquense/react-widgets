module.exports = {
  roots: ['<rootDir>/test'],
  testRegex: '-test\\.js$',
  setupFilesAfterEnv: [require.resolve('./test/index.js')],
}
