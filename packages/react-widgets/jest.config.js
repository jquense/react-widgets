module.exports = {
  roots: ['<rootDir>/test'],
  testRegex: '-test\\.(j|t)sx?$',
  setupFilesAfterEnv: [require.resolve('./test/index.js')],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { rootMode: 'upward' }],
  },
}
