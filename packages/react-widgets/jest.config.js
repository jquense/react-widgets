module.exports = {
  roots: ['<rootDir>/test'],
  testRegex: '-test\\.js$',
  setupFilesAfterEnv: [require.resolve('./test/index.js')],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { rootMode: 'upward' }],
  },
}
